const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cheerio = require("cheerio");

const { getClientName, createChunks } = require("../../helpers");

const TEMP_DIR = path.join(__dirname, "temp");

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// build() {
//   this.data.groups.sort((a, b) => a.printOrder - b.printOrder);

//   const partsGroups = this.data.groups.filter(group => group.groupType === 'PARTS');

//   partsGroups.forEach(group => {
//     group.data.sort((a, b) => a.printOrder - b.printOrder);
//   });

//   const dataGroupIndex = this.data.groups.findIndex(group => group.groupType === 'DATA');

//   if (dataGroupIndex !== -1) {
//     const [dataGroup] = this.data.groups.splice(dataGroupIndex, 1);

//     this.content += this.buildGroup(dataGroup);
//   }

//   const items = this.data.groups
//     .filter(group => group.groupType === 'PARTS')
//     .flatMap(group => group.data);

//   partsGroups[0].data.splice(0, 2);

//   this.data.groups.forEach(group => {
//     this.content += this.buildGroup(group);
//   });

//   this.content += this.buildRatings(items);

//   this.content += this.buildSignatureSection(this.data.notes, this.data.expert, this.data.analyst, this.data.unit);

//   if (this.data.expertSignature != null) {
//   }
//   this.content += '</body></html>';
//   return this.content;
// }

function setGroupOrder(id, group, $) {
  $(`#${id}`)
    .removeClass((i, className) => (className.match(/order-\d+/g) || []).join(" "))
    .removeClass("hidden")
    .addClass(`order-${group.printOrder}`);
}

function vehicleDetailComparisonComponent(vehicleData, factoryData, content) {
  const $ = cheerio.load(content);

  setGroupOrder("VehicleDataComparison", vehicleData, $);

  $(".grid.grid-cols-3").each((_, element) => {
    const label = $(element).find("div:first-child").text().trim();
    const cells = $(element).find("div:nth-child(n+2)");

    let key;

    if (label.includes("PLACA")) key = "licensePlate";
    if (label.includes("MARCA/MODELO")) key = "brandModel";
    if (label.includes("COR")) key = "color";
    if (label.includes("COMBUSTÍVEL")) key = "fuelType";
    if (label.includes("ANO")) key = "yearManufactureModel";
    if (label.includes("GRAV. DO CHASSI")) key = "chassis";
    if (label.includes("GRAVAÇÃO DO MOTOR")) key = "engineNumber";
    if (label.includes("KM")) key = "km";

    if (key) {
      const formattedFactoryData = factoryData[key] || "NÃO INFORMADO";
      const formattedVehicleData = vehicleData.data[key] || "NÃO INFORMADO";

      $(cells[1]).text(formattedFactoryData);

      if (formattedVehicleData !== formattedFactoryData) {
        $(cells[0]).text(formattedVehicleData).addClass("text-red-600 underline font-bold");
      } else {
        $(cells[0]).text(formattedVehicleData).removeClass("text-red-600 underline font-bold");
      }
    }
  });

  return $.html();
}

function vehicleGrid4Component(first4Parts, content) {
  const $ = cheerio.load(content);

  $(".grid.grid-cols-2").each((_, element) => {
    const item = $(element).find(".flex.flex-col.w-full.rounded-2xl.overflow-hidden.bg-gray-100.shadow-md");

    for (let i = 1; i < first4Parts.length; i++) {
      const newItem = item.clone();
      item.after(newItem);
    }

    const items = $(element).find(".flex.flex-col.w-full.rounded-2xl.overflow-hidden.bg-gray-100.shadow-md");
    items.each((index, item) => {
      const img = $(item).find("img");
      const part = first4Parts[index];
      const imgSrc = part?.s3File?.url || "https://i.imgur.com/fl0uV88.png";
      img.attr("src", imgSrc);
    });
  });

  return $.html();
}

function ratingsComponent(allParts, content) {
  const ITEMS_PER_PAGE = 10;

  const formattedRatingsList = allParts
    .map((part) => {
      return part.ratings.filter((rating) => rating.isSelected).map((rating) => ({ rating, partName: part.name }));
    })
    .flat();

  const chunks = createChunks(formattedRatingsList, ITEMS_PER_PAGE);

  const $ = cheerio.load(content);

  $("#RatingGrid").each((_, element) => {
    const item = $(element).find("#RatingChunk");

    for (let i = 1; i < chunks.length; i++) {
      const newItem = item.clone();
      item.after(newItem);
    }

    const items = $(element).find("#RatingChunk");

    items.each((index, itemItems) => {
      if (index === 0) {
        $(item).find("#RatingGridTitle").removeClass("hidden");
      }

      const ratingChunkItem = $(itemItems).find("#RatingChunkItem");

      for (let i = 1; i < chunks[index].length; i++) {
        const newItem = ratingChunkItem.clone();
        ratingChunkItem.after(newItem);
      }

      chunks[index].forEach(({ rating, partName }, ratingIndex) => {
        const ratingItem = $(itemItems).find("#RatingChunkItem").eq(ratingIndex);

        ratingItem.find("#title").text(partName);
        ratingItem.find("#description").text(rating.name);

        const statusToId = {
          SUCCESS: "#SUCCESS",
          RESTRICTION: "#RESTRICTION",
          OBSERVATION: "#OBSERVATION",
          FAILED: "#FAILED",
        };

        const iconId = statusToId[rating.icon];
        ratingItem.find(iconId).removeClass("hidden");
      });
    });
  });

  return $.html();
}

/**
 * Função para buscar um valor aninhado dentro de um objeto a partir de uma string de caminho.
 * Exemplo: getNestedValue(obj, "inspectionVehicleData.data.licensePlate")
 */
function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), obj);
}

async function Layout2Builder(data) {
  const fileId = uuidv4();
  const tempFilePath = path.join(TEMP_DIR, `index-${fileId}.html`);

  try {
    let content = fs.readFileSync(path.join(__dirname, "../../../client2/dist/index.html"), "utf8");

    content = content.replace(/{([\w.]+)}/g, (match, path) => {
      if (path === "clientName") return getClientName(data.client);
      return getNestedValue(data, path) || "";
    });

    const vehicleDataIndex = data.groups.findIndex((group) => group.groupType === "DATA");
    if (vehicleDataIndex !== -1) {
      const factoryData = data.inspectionVehicleData.data;
      const vehicleData = data.groups[vehicleDataIndex];
      content = vehicleDetailComparisonComponent(vehicleData, factoryData, content);
    }

    const groupParts = data.groups
      .filter((group) => group.groupType === "PARTS")
      .map((group) => ({
        ...group,
        data: group.data.filter((item) => !item.isPlaceholder),
      }));
    if (groupParts.length > 0) {
      const allParts = groupParts.flatMap((group) => group.data).sort((a, b) => a.printOrder - b.printOrder);
      const first4Parts = allParts.slice(0, 4);
      content = vehicleGrid4Component(first4Parts, content);

      content = ratingsComponent(allParts, content);
    }

    fs.writeFileSync(tempFilePath, content, "utf8");

    return tempFilePath;
  } catch (error) {
    console.error("Erro ao gerar HTML personalizado:", error.message);
    throw new Error("Falha ao gerar HTML personalizado.");
  }
}

module.exports = { Layout2Builder };
