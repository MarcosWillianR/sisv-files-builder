const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cheerio = require("cheerio");

const { createChunks, getNestedValue, setGroupOrder, createTempDir } = require("..");

const TEMP_DIR = createTempDir();

function formattedClientName(client) {
  if (!client || client.clientType === 'AVULSO') return "PARTICULAR";
  if (client.clientType === 'INDIVIDUAL') {
    return `${client.user.firstName} ${client.user.lastName}`;
  }
  if (client.clientType === 'COMPANY') {
    return `${client.company.name}`
  }
  return "PARTICULAR";
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

  $("#VehicleGrid4").each((_, element) => {
    const item = $(element).find("#VehicleGrid4Item");

    for (let i = 1; i < first4Parts.length; i++) {
      const newItem = item.clone();
      item.after(newItem);
    }

    const items = $(element).find("#VehicleGrid4Item");

    items.each((index, item) => {
      const img = $(item).find("img");
      const part = first4Parts[index];
      const imgSrc = part?.s3File?.url;
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

function vehicleGrid6Component(restParts, content) {
  const ITEMS_PER_PAGE = 6;
  const chunks = createChunks(restParts, ITEMS_PER_PAGE);

  const $ = cheerio.load(content);

  $("#VehicleGrid6").each((_, element) => {
    const item = $(element).find("#VehicleChunk");

    for (let i = 1; i < chunks.length; i++) {
      const newItem = item.clone();
      item.after(newItem);
    }

    const items = $(element).find("#VehicleChunk");

    items.each((index, itemItems) => {
      if (index === 0) {
        $(item).find("#VehicleGrid6Title").removeClass("hidden");
      }

      const vehicleChunkItem = $(itemItems).find("#VehicleChunkItem");

      for (let i = 1; i < chunks[index].length; i++) {
        const newItem = vehicleChunkItem.clone();
        vehicleChunkItem.after(newItem);
      }

      chunks[index].forEach((part, partIndex) => {
        const vehicleItem = $(itemItems).find("#VehicleChunkItem").eq(partIndex);
        const selectedRating = part.ratings.find((rating) => rating.isSelected);

        vehicleItem.find("img").attr("src", part?.s3File?.url);
        vehicleItem.find("#vehicleName").text(part.name ?? "NÃO INFORMADO");
        vehicleItem.find("#vehicleDesc").text(selectedRating?.name ?? "NÃO INFORMADO");

        const statusToId = {
          SUCCESS: "#VehicleGrid6-SUCCESS",
          RESTRICTION: "#VehicleGrid6-RESTRICTION",
          OBSERVATION: "#VehicleGrid6-OBSERVATION",
          FAILED: "#VehicleGrid6-FAILED",
        };

        const iconId = statusToId[selectedRating?.icon];
        vehicleItem.find(iconId).removeClass("hidden");
      });
    });
  });

  return $.html();
}

function observationGridComponent(descriptionData, content) {
  const $ = cheerio.load(content);

  setGroupOrder("ObservationGrid", descriptionData, $);

  $("#ObservationGrid").each((_, element) => {
    const title = $(element).find("#ObservationGridTitle");
    const description = $(element).find("#ObservationGridText");

    title.text(descriptionData.name);
    description.text(descriptionData.data.textObservation);
  });

  return $.html();
}

function notesGridComponent(notes, content) {
  const $ = cheerio.load(content);

  $("#NotesGrid").each((_, element) => {
    const description = $(element).find("#NotesGridText");
    description.text(notes);
  });

  return $.html();
}

async function Layout2Builder(data) {
  const fileId = uuidv4();
  const tempFilePath = path.join(TEMP_DIR, `index-${fileId}.html`);

  try {
    let content = fs.readFileSync(path.join(__dirname, "../../../client2/dist/index.html"), "utf8");

    content = content.replace(/{([\w.]+)}/g, (match, path) => {
      if (path === "formattedClientName") return formattedClientName(data.client);
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

      // Primeiro grupo com 4 fotos
      content = vehicleGrid4Component(allParts.slice(0, 4), content);

      // Classificações
      content = ratingsComponent(allParts, content);

      // Resto das fotos
      content = vehicleGrid6Component(allParts.slice(4), content);
    }

    const groupDescriptionIndex = data.groups.findIndex((group) => group.groupType === "OBSERVATION");
    if (groupDescriptionIndex !== -1) {
      content = observationGridComponent(data.groups[groupDescriptionIndex], content);
    }

    content = notesGridComponent(data.notes, content);

    fs.writeFileSync(tempFilePath, content, "utf8");

    return tempFilePath;
  } catch (error) {
    console.error("Erro ao gerar HTML personalizado:", error.message);
    throw new Error("Falha ao gerar HTML personalizado.");
  }
}

module.exports = { Layout2Builder };
