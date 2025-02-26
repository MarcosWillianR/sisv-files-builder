const QRCode = require("qrcode");
const fs = require("fs").promises;
const puppeteer = require("puppeteer");

async function getHeaderScreenshot(data, layout) {
  const headerBuilder = await getHeaderBuilder(layout);
  await headerBuilder.build(data); // Gera o HTML do cabeçalho

  const headerContent = headerBuilder.getContent(); // Obtém o HTML gerado

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const headerPage = await browser.newPage();

  // Definir o conteúdo da página
  await headerPage.setContent(headerContent);

  await headerPage.waitForSelector(".header"); // Aguarda o elemento aparecer

  const headerElement = await headerPage.$(".header"); // Obtém a referência do elemento

  const headerScreenshot = await headerElement.screenshot({
    encoding: "base64",
  });

  await browser.close();
  return headerScreenshot;
}

async function getHeaderBuilder(layout) {
  let HeaderBuilder;
  if (layout === "LAYOUT_1") {
    HeaderBuilder = (await import("../../client1/src/components/builders/HeaderBuilder.js")).default;
  } else if (layout === "LAYOUT_2") {
    HeaderBuilder = (await import("../../client2/src/components/builders/HeaderBuilder.js")).default;
  } else if (layout === "LAYOUT_3") {
    HeaderBuilder = (await import("../../client3/src/components/builders/HeaderBuilder.js")).default;
  } else {
    throw new Error(`LAYOUT inválido: ${layout}`);
  }

  return new HeaderBuilder(); // Retorna a instância corretamente
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
    const jsonString = JSON.stringify(jsonData, null, 2); // Converte o JSON para string com indentação
    await fs.writeFile(filePath, jsonString); // Salva o JSON no caminho especificado
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

module.exports = {
  deleteFile,
  saveJsonToFile,
  getHeaderScreenshot,
  findPropertyJson,
  customColorsStyleTag,
  getClientName,
};
