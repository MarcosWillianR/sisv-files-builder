const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

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

async function HistoryBuilder(data) {
  const availableGroups = data.groups.filter((g) => g.isPdfEnabled);
  let historyPath = null;
  const fileId = uuidv4();

  const groupHistoryIndex = availableGroups.findIndex((group) => group.groupType === "HISTORY");
  if (groupHistoryIndex !== -1 && data.IsSearchMandatory) {
    const groupHistory = data.groups[groupHistoryIndex];
    const apiDataParsed = JSON.parse(groupHistory.data.apiData);
    const modifiedHtml = await fetchAndModifyExternalHtml(apiDataParsed.RETORNO.ArquivoPesquisa);
    historyPath = path.join(__dirname, `preview_${fileId}.html`);
    fs.writeFileSync(historyPath, modifiedHtml, "utf-8");
  }
  return historyPath;
}

module.exports = { HistoryBuilder };
