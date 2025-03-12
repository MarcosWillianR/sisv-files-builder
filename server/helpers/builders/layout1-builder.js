const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cheerio = require("cheerio");

const { getClientName, createChunks, getNestedValue, setGroupOrder, createTempDir } = require("..");

const TEMP_DIR = createTempDir();

function formattedPhoneNumber(value) {
  if (!value) return "";
  const cleaned = value.replace(/\D/g, "");
  return cleaned
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

function formattedCNPJ(value) {
  if (!value) return "";
  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

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

function formattedClientPhone(client) {
  if (!client || client.clientType === 'AVULSO') return "";
  if (client.clientType === 'INDIVIDUAL') {
    return formattedPhoneNumber(client.phone);
  }
  if (client.clientType === 'COMPANY') {
    return formattedPhoneNumber(client.company.phone);
  }
  return "";
};

function vehicleDetailComparisonComponent(vehicleData, factoryData, kmValue, content) {
  const $ = cheerio.load(content);

  $("#VehicleDataComparison").each((_, element) => {
    $(element).removeClass("hidden");
  });

  $(".grid.grid-cols-3").each((_, element) => {
    const label = $(element).find("div:first-child").text().trim();
    const cells = $(element).find("div.py-1.px-4.text-sm").slice(-2);

    let key;

    if (label.includes("PLACA")) key = "licensePlate";
    if (label.includes("MARCA/MODELO")) key = "brandModel";
    if (label.includes("COR")) key = "color";
    if (label.includes("COMBUSTÍVEL")) key = "fuelType";
    if (label.includes("ANO")) key = "yearManufactureModel";
    if (label.includes("GRAV. DO CHASSI")) key = "chassis";
    if (label.includes("GRAV. DO MOTOR")) key = "engineNumber";
    if (label.includes("KM")) key = "km";

    if (key) {
      const formattedFactoryData = key === 'km' ? kmValue : factoryData[key] || "Não informado";
      const formattedVehicleData = vehicleData[key] || "Não informado";
      
      $(cells[0]).text(formattedFactoryData);
      $(cells[1]).text(formattedVehicleData);

      if (formattedVehicleData.toLowerCase() !== formattedFactoryData.toLowerCase() && key !== 'km') {
        $(cells[0]).text(formattedFactoryData).addClass("text-red-600 underline font-bold");
      } else {
        $(cells[0]).text(formattedFactoryData).removeClass("text-red-600 underline font-bold");
      }
    }
  });

  return $.html();
}

function observationGridComponent(descriptionData, content) {
  const $ = cheerio.load(content);

  $("#ObservationGrid").each((_, element) => {
    $(element).removeClass('hidden');

    const title = $(element).find("h2");
    const description = $(element).find("p");

    title.text(descriptionData.name);
    description.text(descriptionData.data.textObservation);
  });

  return $.html();
}

function vehicleGrid2Component(restParts, content) {
  const ITEMS_PER_PAGE = 2;
  const chunks = createChunks(restParts, ITEMS_PER_PAGE);

  const $ = cheerio.load(content);

  $("#VehicleGrid2").each((_, element) => {
    $(element).removeClass("hidden");
    const item = $(element).find("#VehicleChunk");

    for (let i = 1; i < chunks.length; i++) {
      const newItem = item.clone();
      item.after(newItem);
    }

    const items = $(element).find("#VehicleChunk");

    items.each((index, itemItems) => {
      const vehicleChunkItem = $(itemItems).find("#VehicleChunkItem");

      for (let i = 1; i < chunks[index].length; i++) {
        const newItem = vehicleChunkItem.clone();
        vehicleChunkItem.after(newItem);
      }

      chunks[index].forEach((part, partIndex) => {
        const vehicleItem = $(itemItems).find("#VehicleChunkItem").eq(partIndex);
        const selectedRating = part.ratings.find((rating) => rating.isSelected);

        vehicleItem.find("img").attr("src", part?.s3File?.url);
        vehicleItem.find("#vehicleName").text(part.name ?? "");
        vehicleItem.find("#vehicleDesc").text(selectedRating?.name ?? "");

        const statusToId = {
          SUCCESS: "#VehicleGrid2-SUCCESS",
          RESTRICTION: "#VehicleGrid2-RESTRICTION",
          OBSERVATION: "#VehicleGrid2-OBSERVATION",
          FAILED: "#VehicleGrid2-FAILED",
        };

        const iconId = statusToId[selectedRating?.icon];
        vehicleItem.find(iconId).removeClass("hidden");
      });
    });
  });

  return $.html();
}

function vehicleGrid12Component(restParts, content) {
  const ITEMS_PER_PAGE = 12;
  const chunks = createChunks(restParts, ITEMS_PER_PAGE);

  const $ = cheerio.load(content);

  $("#VehicleGrid12").each((_, element) => {
    $(element).removeClass("hidden");
    const item = $(element).find("#VehicleChunk");

    for (let i = 1; i < chunks.length; i++) {
      const newItem = item.clone();
      item.after(newItem);
    }

    const items = $(element).find("#VehicleChunk");

    items.each((index, itemItems) => {
      if (index === 0) {
        $(item).find("#VehicleGrid12Title").removeClass("hidden");
      }

      const vehicleChunkItem = $(itemItems).find("#VehicleChunkItem");

      for (let i = 1; i < chunks[index].length; i++) {
        const newItem = vehicleChunkItem.clone();
        vehicleChunkItem.after(newItem);
      }

      chunks[index].forEach((part, partIndex) => {
        const vehicleItem = $(itemItems).find("#VehicleChunkItem").eq(partIndex);
        const selectedRating = part.ratings.find((rating) => rating.isSelected);
        let formattedDesc = selectedRating?.name ?? "";
        if (formattedDesc.length > 30) {
          formattedDesc = formattedDesc.substring(0, 25) + '...';
        }

        vehicleItem.find("img").attr("src", part?.s3File?.url);
        vehicleItem.find("#vehicleName").text(part.name ?? "");
        vehicleItem.find("#vehicleDesc").text(formattedDesc);

        const statusToId = {
          SUCCESS: "#VehicleGrid12-SUCCESS",
          RESTRICTION: "#VehicleGrid12-RESTRICTION",
          OBSERVATION: "#VehicleGrid12-OBSERVATION",
          FAILED: "#VehicleGrid12-FAILED",
        };

        const iconId = statusToId[selectedRating?.icon];
        vehicleItem.find(iconId).removeClass("hidden");
      });
    });
  });

  return $.html();
}

function ratingsComponent(allParts, content) {
  const $ = cheerio.load(content);

  const ITEMS_PER_PAGE = 28;

  const formattedRatingsList = allParts
    .map((part) => {
      return part.ratings.filter((rating) => rating.isSelected).map((rating) => ({ rating, partName: part.name }));
    })
    .flat();

  if (!formattedRatingsList.length) return $.html();

  const chunks = createChunks(formattedRatingsList, ITEMS_PER_PAGE);


  $("#RatingGrid").each((_, element) => {
    $(element).removeClass('hidden');
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

function notesGridComponent(notes, content) {
  const $ = cheerio.load(content);

  $("#NotesGrid").each((_, element) => {
    $(element).removeClass('hidden');
    const description = $(element).find("#NotesGridText");
    description.text(notes);
  });

  return $.html();
}

async function Layout1Builder(data) {
  const fileId = uuidv4();
  const tempFilePath = path.join(TEMP_DIR, `index-${fileId}.html`);

  try {
    let content = fs.readFileSync(path.join(__dirname, "../../../client1/dist/index.html"), "utf8");

    const availableGroups = data.groups.filter((g) => g.isPdfEnabled);

    content = content.replace(/{([\w.]+)}/g, (match, path) => {
      if (path === "clientName") return getClientName(data.client);
      if (path === "formattedUnitPhone") return formattedPhoneNumber(data.unit.phone);
      if (path === "formattedUnitCNPJ") return formattedCNPJ(data.unit.cnpj);
      if (path === "formattedClientName") return formattedClientName(data.client);
      if (path === "formattedClientPhone") return formattedClientPhone(data.client);
      return getNestedValue(data, path) || "";
    });

    const groupDescriptionIndex = availableGroups.findIndex((group) => group.groupType === "OBSERVATION");
    const vehicleDataIndex = availableGroups.findIndex((group) => group.groupType === "DATA");
    if (vehicleDataIndex !== -1) {
      const factoryData = data.inspectionVehicleData.data;
      const vehicleData = data.groups[vehicleDataIndex].data;
      let kmValue = 0;

      if (groupDescriptionIndex !== -1) {
        kmValue = data.groups[groupDescriptionIndex].data.km;
      }
      content = vehicleDetailComparisonComponent(vehicleData, factoryData, kmValue, content);
    }

    if (groupDescriptionIndex !== -1) {
      content = observationGridComponent(data.groups[groupDescriptionIndex], content);
    }

    const groupParts = availableGroups
      .filter((group) => group.groupType === "PARTS")
      .map((group) => ({
        ...group,
        data: group.data.filter((item) => !item.isPlaceholder),
      }));
    if (groupParts.length > 0) {
      const allParts = groupParts.flatMap((group) => group.data).sort((a, b) => a.printOrder - b.printOrder);
      const availableParts = []

      allParts.forEach(p => {
        if (p.isRequired) {
          const hasOneRatingSelected = p.ratings.findIndex(r => r.isSelected);
          if (hasOneRatingSelected !== -1) {
            availableParts.push(p);
          }
        } else {
          availableParts.push(p);
        }
      })

      // Primeiro grupo com 2 fotos
      content = vehicleGrid2Component(availableParts.slice(0, 2), content);

      // Resto das fotos
      if (availableParts.length > 2) {
        content = vehicleGrid12Component(availableParts.slice(2), content);
      }

      // Classificações
      content = ratingsComponent(allParts, content);
    }

    content = notesGridComponent(data.notes, content);

    fs.writeFileSync(tempFilePath, content, "utf8");

    return tempFilePath;
  } catch (error) {
    console.error("Erro ao gerar HTML personalizado:", error.message);
    throw new Error("Falha ao gerar HTML personalizado.");
  }
}

module.exports = { Layout1Builder };
