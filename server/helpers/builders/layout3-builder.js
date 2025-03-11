const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cheerio = require("cheerio");
const QRCode = require("qrcode");
const { format } = require("date-fns");

const { getClientName, createChunks, getNestedValue, createTempDir, getFormattedField } = require("..");

const TEMP_DIR = createTempDir();

async function generateQRCode(pdfViewUrl) {
  const qrCodeUrl = await QRCode.toDataURL(pdfViewUrl);
  return qrCodeUrl;
}

function formattedDate(date) {
  const formattedDate = format(new Date(date), "dd/MM/yyyy");
  return formattedDate;
}

function formattedHour(date) {
  const timePart = date.split(" ")[1];
  const [hours, minutes] = timePart.split(":");
  const formattedHour = `${hours}:${minutes}`;
  return formattedHour;
}

async function replaceAsync(content, data) {
  const matches = content.match(/{([\w.]+)}/g) || [];

  const replacements = await Promise.all(
    matches.map(async (match) => {
      const path = match.replace(/[{}]/g, "");
      let replacement;

      switch (path) {
        case "clientName":
          replacement = getClientName(data.client);
          break;
        case "formattedCNPJ":
          replacement = getFormattedField("CNPJ", data.unit.cnpj);
          break;
        case "QRCode":
          replacement = await generateQRCode(data.pdfViewUrl);
          break;
        case "formattedDate":
          replacement = formattedDate(data.completeDate);
          break;
        case "formattedHour":
          replacement = formattedHour(data.completeDate);
          break;
        case "formattedBrand":
          replacement = data.inspectionVehicleData.data.brandModel.split(" ")[0];
          break;
        case "formattedModel":
          replacement = data.inspectionVehicleData.data.brandModel.split(" ")[1];
          break;
        default:
          replacement = getNestedValue(data, path) || "";
      }

      return { match, replacement };
    })
  );

  replacements.forEach(({ match, replacement }) => {
    content = content.replace(match, replacement);
  });

  return content;
}

function vehicleStatusGridComponent(data, content) {
  const { HISTORICOROUBOFURTO, RECALL, QUADRORESUMO } = data;

  const hasAuction = () => {
    const hasAuction1 = QUADRORESUMO?.Leilao1 === "SIM";
    const hasAuction2 = QUADRORESUMO?.Leilao2 === "SIM";
    const hasAuction3 = QUADRORESUMO?.Leilao3 === "SIM";
    return hasAuction1 || hasAuction2 || hasAuction3;
  };

  const roubofurtoValue = HISTORICOROUBOFURTO?.Consta === "0" ? "Não possui" : "Possui";
  const debitosMultas = QUADRORESUMO?.TotalDeDebitos === "SIM" ? "Possui" : "Não possui";
  const restricoes = QUADRORESUMO?.Restricoes === "SIM" ? "Possui" : "Não possui";
  const indicioSinistro = QUADRORESUMO?.IndicioDeSinistro1 === "SIM" ? "Possui" : "Não possui";
  const sinistro = QUADRORESUMO?.Sinistro === "SIM" ? "Possui" : "Não possui";
  const leilao = hasAuction() ? "Possui" : "Não possui";
  const recall = RECALL?.Recall?.includes("Não") ? "Não possui" : "Possui";
  const vendadireta = QUADRORESUMO?.VendaDireta === "SIM" ? "Possui" : "Não possui";
  const remarketing = QUADRORESUMO?.Remarketing === "SIM" ? "Possui" : "Não possui";

  const $ = cheerio.load(content);

  $("#VehicleStatusGrid").each((_, element) => {
    $(element).removeClass("hidden");
  });

  $(".grid.grid-cols-3 > div").each((_, element) => {
    const label = $(element).find("h3").text();

    let key;
    let elementSearch;

    if (label === "Roubo / Furto") {
      key = roubofurtoValue;
      elementSearch = "#VSG-wrapper-roubofurto";
    }

    if (label === "Débitos / Multas") {
      key = debitosMultas;
      elementSearch = "#VSG-wrapper-debitosmultas";
    }

    if (label === "Restrições") {
      key = restricoes;
      elementSearch = "#VSG-wrapper-restricoes";
    }

    if (label === "Indício de Sinistro") {
      key = indicioSinistro;
      elementSearch = "#VSG-wrapper-indiciosinistro";
    }

    if (label === "Sinistro") {
      key = sinistro;
      elementSearch = "#VSG-wrapper-sinistro";
    }

    if (label === "Leilão") {
      key = leilao;
      elementSearch = "#VSG-wrapper-leilao";
    }

    if (label === "Recall") {
      key = recall;
      elementSearch = "#VSG-wrapper-recall";
    }

    if (label === "Venda direta") {
      key = vendadireta;
      elementSearch = "#VSG-wrapper-vendadireta";
    }

    if (label === "Remarketing") {
      key = remarketing;
      elementSearch = "#VSG-wrapper-remarketing";
    }

    if (key) {
      const el = $(element).find(elementSearch);

      if (key === "Possui") {
        el.addClass("t-bg-red100");
        el.find("div:nth-child(2)").removeClass("hidden"); // mostra icone
        const spanEl = el.find("span");
        spanEl.addClass("t-text-red700");
        spanEl.text(key);
      } else {
        el.addClass("t-bg-green100");
        el.find("div:nth-child(1)").removeClass("hidden"); // mostra icone
        const spanEl = el.find("span");
        spanEl.addClass("t-text-green700");
        spanEl.text(key);
      }
    }
  });

  return $.html();
}

function debtsSummaryComponent(data, content) {
  const { IPVA, Licenciamento, Multas, DPVAT, TotalDeDividas } = data;

  // function somarDebitos(obj) {
  //   return Object.values(obj)
  //     .filter((valor) => valor !== "R$ 0,00" && valor !== "-")
  //     .map((valor) => Number(valor.replace("R$", "").replace(",", ".")))
  //     .reduce((total, num) => total + num, 0);
  // }

  // const totalValue = somarDebitos({ IPVA, Licenciamento, DPVAT, Multas })

  const $ = cheerio.load(content);

  $("#DebtsSummary").each((_, element) => {
    $(element).removeClass("hidden");
  });

  $(".debt-item").each((_, element) => {
    const label = $(element).find("h3").text();
    const spanEl = $(element).find("span");

    let key;

    if (label === "IPVA") key = IPVA;
    if (label === "Licenciamento") key = Licenciamento;
    if (label === "DPVAT") key = DPVAT;
    if (label === "Multas") key = Multas;
    if (label === "Total de dívidas") key = TotalDeDividas; //formatValue(totalValue);

    if (key) {
      if (key === "R$ 0,00") {
        spanEl.addClass("t-text-blue600");
        spanEl.text(key);
      } else {
        spanEl.addClass("t-text-red600");
        spanEl.text(key);
      }
    }
  });

  return $.html();
}

function evaluationDetailsComponent(data, content) {
  const $ = cheerio.load(content);

  $("#EvaluationDetails").each((_, element) => {
    $(element).removeClass("hidden");
    const description = $(element).find("p");
    description.text(data.data.textObservation);
  });

  return $.html();
}

function vehicleDetailComparisonComponent(vehicleData, factoryData, senatramData, content) {
  const $ = cheerio.load(content);

  $("#VehicleDataComparison").each((_, element) => {
    $(element).removeClass("hidden");
  });

  $(".grid.grid-cols-4").each((_, element) => {
    const label = $(element).find("div:first-child").text().trim();
    const cells = $(element).find("div.py-1.px-4.text-sm").slice(-3);

    let key;

    if (label.includes("Placa")) key = "licensePlate";
    if (label.includes("Gravação do chassi")) key = "chassis";
    if (label.includes("Gravação do motor")) key = "engineNumber";
    if (label.includes("Gravação do câmbio")) key = "NCambio";
    if (label.includes("Cor")) key = "color";
    if (label.includes("Combustível")) key = "fuelType";

    if (key) {
      const formattedFactoryData = factoryData[key] || "NÃO INFORMADO";
      const formattedVehicleData = vehicleData[key] || "NÃO INFORMADO";
      const formattedSenatramData = senatramData[key] || "NÃO INFORMADO";

      $(cells[1]).text(formattedFactoryData);
      $(cells[2]).text(formattedSenatramData);

      if (
        formattedVehicleData.toLowerCase() !== formattedFactoryData.toLowerCase() ||
        formattedVehicleData.toLowerCase() !== formattedSenatramData.toLowerCase()
      ) {
        $(cells[0]).text(formattedVehicleData).addClass("text-red-600 underline font-bold");
      } else {
        $(cells[0]).text(formattedVehicleData).removeClass("text-red-600 underline font-bold");
      }
    }
  });

  return $.html();
}

function vehicleGrid6Component(restParts, location, content) {
  const ITEMS_PER_PAGE = 6;
  const chunks = createChunks(restParts, ITEMS_PER_PAGE);

  const $ = cheerio.load(content);

  $("#VehicleGrid6").each((_, element) => {
    $(element).removeClass("hidden");
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
        vehicleItem.find("p").text(location);

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

function vehicleGrid15Component(restParts, location, content) {
  const ITEMS_PER_PAGE = 15;
  const chunks = createChunks(restParts, ITEMS_PER_PAGE);

  const $ = cheerio.load(content);

  $("#VehicleGrid15").each((_, element) => {
    $(element).removeClass("hidden");
    const item = $(element).find("#VehicleChunk");

    for (let i = 1; i < chunks.length; i++) {
      const newItem = item.clone();
      item.after(newItem);
    }

    const items = $(element).find("#VehicleChunk");

    items.each((index, itemItems) => {
      if (index === 0) {
        $(item).find("#VehicleGrid15Title").removeClass("hidden");
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
        vehicleItem.find("p").text(location);

        const statusToId = {
          SUCCESS: "#VehicleGrid15-SUCCESS",
          RESTRICTION: "#VehicleGrid15-RESTRICTION",
          OBSERVATION: "#VehicleGrid15-OBSERVATION",
          FAILED: "#VehicleGrid15-FAILED",
        };

        const iconId = statusToId[selectedRating?.icon];
        vehicleItem.find(iconId).removeClass("hidden");
      });
    });
  });

  return $.html();
}

function notesGridComponent(notes, content) {
  const $ = cheerio.load(content);

  $("#NotesGrid").each((_, element) => {
    const description = $(element).find("p");
    description.text(notes);
  });

  return $.html();
}

async function Layout3Builder(data) {
  const fileId = uuidv4();
  const tempFilePath = path.join(TEMP_DIR, `index-${fileId}.html`);

  try {
    let content = fs.readFileSync(path.join(__dirname, "../../../client3/dist/index.html"), "utf8");
    const location = `${data.address?.city ?? '-'}, ${data.address?.state ?? '-'}`;

    content = await replaceAsync(content, data);

    const availableGroups = data.groups.filter((g) => g.isPdfEnabled);

    const vehicleHistoryIndex = availableGroups.findIndex((group) => group.groupType === "HISTORY");
    if (vehicleHistoryIndex !== -1) {
      const groupData = data.groups[vehicleHistoryIndex];
      const apiDataParsed = JSON.parse(groupData.data.apiData);

      content = vehicleStatusGridComponent(apiDataParsed, content);

      const hasDebits = (obj) => Object.values(obj).some((valor) => valor !== "R$ 0,00" && valor !== "-");
      if (hasDebits(apiDataParsed.QUADRODEBITOS)) {
        content = debtsSummaryComponent(apiDataParsed.QUADRODEBITOS, content);
      }
    }

    const vehicleObservationIndex = availableGroups.findIndex((group) => group.groupType === "OBSERVATION");
    if (vehicleObservationIndex !== -1) {
      const groupData = data.groups[vehicleObservationIndex];
      content = evaluationDetailsComponent(groupData, content);
    }

    const vehicleDataIndex = availableGroups.findIndex((group) => group.groupType === "DATA");
    if (vehicleDataIndex !== -1) {
      const factoryData = { ...data.inspectionVehicleData.data, NCambio: "" };
      const vehicleData = { ...data.groups[vehicleDataIndex].data, NCambio: "" };
      const senatramData = { licensePlate: "", chassis: "", engineNumber: "", NCambio: "", color: "", fuelType: "" };

      if (vehicleHistoryIndex !== -1) {
        const { BASENACIONAL } = JSON.parse(data.groups[vehicleHistoryIndex].data.apiData);
        senatramData.fuelType = BASENACIONAL.Combustivel;
        senatramData.color = BASENACIONAL.Cor;
        senatramData.NCambio = BASENACIONAL.NCambio;
        senatramData.engineNumber = BASENACIONAL.NMotor;
        senatramData.chassis = BASENACIONAL.chassi;
        senatramData.licensePlate = BASENACIONAL.placa;
      }

      content = vehicleDetailComparisonComponent(vehicleData, factoryData, senatramData, content);
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

      // Primeiro grupo com 6 fotos
      content = vehicleGrid6Component(availableParts.slice(0, 6), location, content);
      
      // Resto das fotos
      if (availableParts.length > 6) {
        content = vehicleGrid15Component(availableParts.slice(6), location, content);
      }
    }

    content = notesGridComponent(data.notes, content);

    fs.writeFileSync(tempFilePath, content, "utf8");

    return tempFilePath;
  } catch (error) {
    console.error("Erro ao gerar HTML personalizado:", error.message);
    throw new Error("Falha ao gerar HTML personalizado.");
  }
}

module.exports = { Layout3Builder };
