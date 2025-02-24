const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const TEMP_DIR = path.join(__dirname, "temp");

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const TEMPLATE_PATH = {
  ['LAYOUT_1'] :path.join(__dirname, "../../client/dist/index.html"),
  ['LAYOUT_2'] :path.join(__dirname, "../../client2/dist/index.html")
};


async function generateCustomHtml(layout, replacements) {
  const fileId = uuidv4();
  const tempFilePath = path.join(TEMP_DIR, `index_${fileId}.html`);

  try {
    let content = fs.readFileSync(TEMPLATE_PATH[layout], "utf8");

    for (const key in replacements) {
      const regex = new RegExp(`\\{${key}\\}`, "g");
      content = content.replace(regex, replacements[key]);
    }

    fs.writeFileSync(tempFilePath, content, "utf8");

    return tempFilePath;
  } catch (error) {
    console.error("Erro ao gerar HTML personalizado:", error);
    throw new Error("Falha ao gerar HTML personalizado.");
  }
}

module.exports = { generateCustomHtml };