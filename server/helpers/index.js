const QRCode = require('qrcode');
const fs = require('fs').promises;

async function getHeaderScreenshot() {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
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


module.exports = {
  deleteFile,
  saveJsonToFile
}