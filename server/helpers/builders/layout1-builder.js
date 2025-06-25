const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");

const { generateImage } = require("../../../croqui-builder/src/imageGenerator");
const { getClientName, createChunks, getNestedValue, setGroupOrder, createTempDir } = require("..");

const TEMP_DIR = createTempDir();

async function getHtmlHeight(htmlContent) {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();

  await page.setContent(htmlContent);
  const height = await page.evaluate(() => document.body.scrollHeight);

  await browser.close();
  return height;
}

function formattedPhoneNumber(value) {
  if (!value) return "";
  const cleaned = value.replace(/\D/g, "");
  return cleaned
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
}

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
  if (!client || client.clientType === "AVULSO") return "PARTICULAR";
  if (client.clientType === "INDIVIDUAL") {
    return `${client.user.firstName} ${client.user.lastName}`;
  }
  if (client.clientType === "COMPANY") {
    return `${client.company.name}`;
  }
  return "PARTICULAR";
}

function formattedClientPhone(client) {
  if (!client || client.clientType === "AVULSO") return "";
  if (client.clientType === "INDIVIDUAL") {
    return formattedPhoneNumber(client.phone);
  }
  if (client.clientType === "COMPANY") {
    return formattedPhoneNumber(client.company.phone);
  }
  return "";
}

function vehicleDetailComparisonComponent(vehicleData, factoryData, kmValue, content) {
  const $ = cheerio.load(content);

  $("#VehicleDataComparison").each((_, element) => {
    $(element).removeClass("hidden");
  });

  $(".grid.grid-cols-3").each((_, element) => {
    const label = $(element).find("div:first-child").text().trim();
    const cells = $(element).find("div.py-px.px-4.text-xs").slice(-2);

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
      const formattedFactoryData = factoryData[key] || "";
      const formattedVehicleData = key === "km" ? kmValue : vehicleData[key] || "";

      $(cells[0]).text(formattedVehicleData);
      $(cells[1]).text(formattedFactoryData);

      if (formattedVehicleData.toLowerCase() !== formattedFactoryData.toLowerCase() && key !== "km") {
        $(cells[0]).text(formattedVehicleData).addClass("text-red-600 underline font-bold");
      } else {
        $(cells[0]).text(formattedVehicleData).removeClass("text-red-600 underline font-bold");
      }
    }
  });

  return $.html();
}

function observationGridComponent(obsTitle, obsDescription, content) {
  const $ = cheerio.load(content);

  $("#ObservationGrid").each((_, element) => {
    $(element).removeClass("hidden");

    const title = $(element).find("h2");
    const description = $(element).find("p");

    title.text(obsTitle);
    description.text(obsDescription);
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

        vehicleItem.find("#VehicleGrid2-Image").attr("style", `background-image: url('${part?.s3File?.url}');`);

        let formattedName = part.name ?? "";
        if (formattedName.length >= 25) {
          formattedName = formattedName.substring(0, 25) + "...";
        }
        vehicleItem.find("#vehicleName").text(formattedName);

        const vehicleDesc = vehicleItem.find("#vehicleDesc");
        let formattedDesc = selectedRating?.name ?? "";
        if (formattedDesc.length >= 25) {
          formattedDesc = formattedDesc.substring(0, 25) + "...";
        }

        if (!selectedRating?.name) {
          vehicleDesc.addClass("text-transparent");
        } else {
          vehicleDesc.text(formattedDesc);
        }

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

        vehicleItem.find("#VehicleGrid12-Image").attr("style", `background-image: url('${part?.s3File?.url}');`);

        let formattedName = part.name ?? "";
        if (formattedName.length >= 25) {
          formattedName = formattedName.substring(0, 25) + "...";
        }
        vehicleItem.find("#vehicleName").text(formattedName);

        let formattedDesc = selectedRating?.name ?? "";
        if (formattedDesc.length >= 20) {
          formattedDesc = formattedDesc.substring(0, 20) + "...";
        }
        const vehicleDesc = vehicleItem.find("#vehicleDesc");
        if (!selectedRating?.name) {
          vehicleDesc.addClass("text-transparent");
        } else {
          vehicleDesc.text(formattedDesc);
        }

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
    $(element).removeClass("hidden");
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
    $(element).removeClass("hidden");
    const description = $(element).find("#NotesGridText");
    description.text(notes);
  });

  return $.html();
}

async function fetchAndModifyExternalHtml(url) {
  try {
    const { data: externalHtml } = await axios.get(url);
    const $ = cheerio.load(externalHtml);
    return $.html();
  } catch (error) {
    console.error("Erro ao buscar HTML externo:", error.message);
    return "";
  }
}

async function croquiGridComponent(vehicleType, groupCroquis, content) {
  const ITEMS_PER_PAGE = 2; // 2 croquis por página
  const chunks = createChunks(groupCroquis, ITEMS_PER_PAGE);
  const $ = cheerio.load(content);

  const groupImages = await Promise.all(
    groupCroquis.map(async (gc) => {
      const imageBuffer = await generateImage(vehicleType, gc.data.croquiType, gc.data.items);
      return { id: gc.id, name: gc.name, imageBuffer };
    })
  );

  const $grid = $("#CroquiGrid");
  const $chunkTemplate = $("#CroquiChunk").clone().removeAttr("id");
  $("#CroquiChunk").remove(); // Remove o template do HTML

  const imageMap = Object.fromEntries(groupImages.map((img) => [img.id, img]));

  chunks.forEach((groupChunk) => {
    const $chunk = $chunkTemplate.clone(); // Clona o template de chunk

    // Encontra o container de título (CroquiGridTitle)
    const $title = $chunk.find("#CroquiGridTitle");
    //$title.removeClass('hidden'); // Torna o título visível

    const $container = $chunk.find(".place-items-center");
    $container.empty().css({
      display: "flex",
      "flex-direction": "column", // Empilha os itens (título + imagem) verticalmente
      "align-items": "center", // Centraliza os itens horizontalmente
      gap: "2rem", // Espaçamento entre os grupos
      "min-height": "100vh",
    });

    // Adiciona cada grupo (com título e imagem) no container
    groupChunk.forEach(({ id }) => {
      const imgData = imageMap[id];
      if (!imgData) return;

      // Atualiza o título com o nome dinâmico
      const $titleClone = $title.clone(); // Clona o título para cada item
      $titleClone.find("h2").text(imgData.name); // Define o nome do croqui
      $titleClone.css({
        display: "flex",
        "border-top-left-radius": "16px", // Raio de borda inferior esquerdo
        "border-top-right-radius": "16px", // Raio de borda inferior direito
      });

      const base64 = imgData.imageBuffer.toString("base64");
      const imageSrc = `data:image/png;base64,${base64}`;

      // Cria o div para cada imagem
      const $item = $('<div class="w-full text-center"></div>').css({
        "background-image": `url('${imageSrc}')`,
        "background-size": "contain", // A imagem será ajustada para se manter dentro do espaço disponível
        "background-repeat": "no-repeat",
        "background-position": "center",
        height: "400px", // Altura da imagem
        width: "100%", // Largura máxima
      });

      // Adiciona o título e a imagem dentro de um wrapper
      const $itemWrapper = $('<div class="w-full"></div>').css({
        "text-align": "center",
      });

      $itemWrapper.append($titleClone, $item); // Empilha o título e a imagem

      // Adiciona o item no container da página
      $container.append($itemWrapper);
    });

    $grid.append($chunk); // Adiciona o chunk com os itens no grid
  });

  $grid.removeClass("hidden"); // Torna o grid visível

  return $.html(); // Retorna o HTML final
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
      const factoryData = data.groups[vehicleDataIndex].data;
      const vehicleData = data.inspectionVehicleData.data;
      let kmValue = 0;

      if (groupDescriptionIndex !== -1) {
        kmValue = data.groups[groupDescriptionIndex].data.km;
      }
      content = vehicleDetailComparisonComponent(vehicleData, factoryData, kmValue, content);
    }

    if (groupDescriptionIndex !== -1) {
      const obsTitle = data.groups[groupDescriptionIndex].name;
      let obsDescription = data.groups[groupDescriptionIndex].data.textObservation;
      if (
        data.analystObservation &&
        data.analystObservation !== "No observations" &&
        data.analystObservation !== "No additional notes"
      ) {
        obsDescription = data.analystObservation;
      }
      content = observationGridComponent(obsTitle, obsDescription, content);
    }

    const groupParts = availableGroups
      .filter((group) => group.groupType === "PARTS")
      .map((group) => ({
        ...group,
        data: group.data.filter((item) => !item.isPlaceholder),
      }));
    if (groupParts.length > 0) {
      const allParts = groupParts.flatMap((group) => group.data).sort((a, b) => a.printOrder - b.printOrder);
      const availableParts = [];

      allParts.forEach((p) => {
        if (p.type === "EXTRA") {
          availableParts.push(p);
        } else {
          if (p.isRequired) {
            const hasOneRatingSelected = p.ratings.findIndex((r) => r.isSelected);
            if (hasOneRatingSelected !== -1) {
              availableParts.push(p);
            }
          } else {
            availableParts.push(p);
          }
        }
      });

      if (availableParts.length > 0) {
        // Primeiro grupo com 2 fotos
        content = vehicleGrid2Component(availableParts.slice(0, 2), content);
      }

      // Resto das fotos
      if (availableParts.length > 2) {
        content = vehicleGrid12Component(availableParts.slice(2), content);
      }

      if (allParts.length > 0) {
        // Classificações
        content = ratingsComponent(allParts, content);
      }
    }

    const groupCroquis = availableGroups.filter((group) => group.groupType === "CROQUI");
    if (groupCroquis.length > 0) {
      content = await croquiGridComponent(data.vehicleType, groupCroquis, content);
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
