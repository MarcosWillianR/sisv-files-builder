const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cheerio = require("cheerio");

const { getClientName, createChunks, getNestedValue, setGroupOrder, createTempDir } = require("../../helpers");

const TEMP_DIR = createTempDir();

async function Layout1Builder(data) {
  const fileId = uuidv4();
  const tempFilePath = path.join(TEMP_DIR, `index-${fileId}.html`);

  try {
    let content = fs.readFileSync(path.join(__dirname, "../../../client1/dist/index.html"), "utf8");

    content = content.replace(/{([\w.]+)}/g, (match, path) => {
      if (path === "clientName") return getClientName(data.client);
      return getNestedValue(data, path) || "";
    });

    // const vehicleDataIndex = data.groups.findIndex((group) => group.groupType === "DATA");
    // if (vehicleDataIndex !== -1) {
    //   const factoryData = data.inspectionVehicleData.data;
    //   const vehicleData = data.groups[vehicleDataIndex];
    //   content = vehicleDetailComparisonComponent(vehicleData, factoryData, content);
    // }

    // const groupParts = data.groups
    //   .filter((group) => group.groupType === "PARTS")
    //   .map((group) => ({
    //     ...group,
    //     data: group.data.filter((item) => !item.isPlaceholder),
    //   }));
    // if (groupParts.length > 0) {
    //   const allParts = groupParts.flatMap((group) => group.data).sort((a, b) => a.printOrder - b.printOrder);

    //   // Primeiro grupo com 4 fotos
    //   content = vehicleGrid4Component(allParts.slice(0, 4), content);

    //   // Classificações
    //   content = ratingsComponent(allParts, content);

    //   // Resto das fotos
    //   content = vehicleGrid6Component(allParts.slice(4), content);
    // }

    // const groupDescriptionIndex = data.groups.findIndex((group) => group.groupType === "OBSERVATION");
    // if (groupDescriptionIndex !== -1) {
    //   content = observationGridComponent(data.groups[groupDescriptionIndex], content);
    // }

    content = notesGridComponent(data.notes, content);

    fs.writeFileSync(tempFilePath, content, "utf8");

    return tempFilePath;
  } catch (error) {
    console.error("Erro ao gerar HTML personalizado:", error.message);
    throw new Error("Falha ao gerar HTML personalizado.");
  }
}

module.exports = { Layout1Builder };
