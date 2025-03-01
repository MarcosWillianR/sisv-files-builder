const fs = require("fs").promises;
const fss = require("fs");
const puppeteer = require("puppeteer");
const path = require("path");

async function getHeaderScreenshot(data, layout) {
  const headerBuilder = await getHeaderBuilder(layout);
  await headerBuilder.build(data);

  const browser = await puppeteer.launch({ headless: "new" });
  try {
    const headerPage = await browser.newPage();
    await headerPage.setContent(headerBuilder.getContent());
    await headerPage.waitForSelector(".header");

    const headerElement = await headerPage.$(".header");
    if (!headerElement) throw new Error("Elemento .header não encontrado");

    return headerElement.screenshot({ encoding: "base64" });
  } finally {
    await browser.close();
  }
}

async function getHeaderBuilder(layout) {
  const layouts = {
    LAYOUT_1: "../../client1/src/components/builders/HeaderBuilder.js",
    LAYOUT_2: "../../client2/src/components/builders/HeaderBuilder.js",
    LAYOUT_3: "../../client3/src/components/builders/HeaderBuilder.js",
  };

  const path = layouts[layout];
  if (!path) throw new Error(`LAYOUT inválido: ${layout}`);

  const { default: HeaderBuilder } = await import(path);
  return new HeaderBuilder();
}

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log("Arquivo removido com sucesso!");
  } catch (err) {
    console.error("Erro ao remover o arquivo:", err);
  }
}

async function saveJsonToFile(jsonData, filePath) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true }); // Garante que o diretório existe
    const jsonString = JSON.stringify(jsonData, null, 2);

    console.log(jsonString);
    await fs.writeFile(filePath, jsonString);
    console.log("Arquivo salvo com sucesso!");
  } catch (err) {
    console.error("Erro ao salvar o arquivo:", err);
  }
}

function findPropertyJson(obj, path) {
  const keys = path.split("-");

  let current = obj;
  for (let key of keys) {
    let match = key.match(/(\w+)\[(\d+)\]/);

    if (match) {
      let prop = match[1];
      let index = parseInt(match[2], 10);
      if (!Array.isArray(current[prop]) || current[prop].length <= index) {
        return undefined;
      }
      current = current[prop][index];
    } else {
      if (current[key] === undefined) {
        return undefined;
      }
      current = current[key];
    }
  }
  return current;
}

function customColorsStyleTag(data) {
  const { customizationConfig, approvalStatus } = data;

  const { primaryColor, secondColor } = customizationConfig;
  const { color } = approvalStatus;

  return `
    .primary-bg-color {
      background-color: ${primaryColor}
    }
    .secondary-bg-color {
      background-color: ${secondColor}
    }
    .approval-status-bg-color {
      background-color: ${color}
    }
  `;
}

function getClientName(client) {
  if (!client) return "Particular";
  const firstName = client.firstName || "";
  const lastName = client.lastName || "";
  return `${firstName} ${lastName}`.trim() || "Particular";
}

function createChunks(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Função para buscar um valor aninhado dentro de um objeto a partir de uma string de caminho.
 * Exemplo: getNestedValue(obj, "inspectionVehicleData.data.licensePlate")
 */
function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), obj);
}

function setGroupOrder(id, group, $) {
  $(`#${id}`)
    .removeClass((i, className) => (className.match(/order-\d+/g) || []).join(" "))
    .removeClass("hidden")
    .addClass(`order-${group.printOrder}`);
}

function createTempDir() {
  const TEMP_DIR = path.join(__dirname, "temp");

  if (!fss.existsSync(TEMP_DIR)) {
    fss.mkdirSync(TEMP_DIR, { recursive: true });
  }
  return TEMP_DIR;
}

module.exports = {
  deleteFile,
  saveJsonToFile,
  getHeaderScreenshot,
  findPropertyJson,
  customColorsStyleTag,
  getClientName,
  createChunks,
  getNestedValue,
  setGroupOrder,
  createTempDir,
};
