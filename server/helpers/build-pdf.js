const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const TEMPLATE_PATH = path.join(__dirname, "../../client/dist/index.html");
const TEMP_DIR = path.join(__dirname, "temp");

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

async function generateCustomHtml(replacements) {
  const fileId = uuidv4();
  const tempFilePath = path.join(TEMP_DIR, `index_${fileId}.html`);

  try {
    let content = fs.readFileSync(TEMPLATE_PATH, "utf8");

    for (const key in replacements) {
      const regex = new RegExp(`\\{${key}\\}`, "g"); // Exemplo: {title}
      content = content.replace(regex, replacements[key]);
    }

    // Escreve o conteúdo modificado no novo arquivo
    fs.writeFileSync(tempFilePath, content, "utf8");

    return tempFilePath; // Retorna o caminho do novo arquivo
  } catch (error) {
    console.error("Erro ao gerar HTML personalizado:", error);
    throw new Error("Falha ao gerar HTML personalizado.");
  }
}

module.exports = { generateCustomHtml };