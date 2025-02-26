const { getPdfConfigsByLayout } = require("./helpers/pdf-config");
const { Layout2Builder } = require('./helpers/builders/layout2-builder');

function getBuilderByLayout(layout) {
  const availableLayouts = {
    LAYOUT_1: null,
    LAYOUT_2: Layout2Builder,
    LAYOUT_3: null,
  }
  return availableLayouts[layout];
}

async function buildPDF(data) {
  const layoutType = data.layout
  const builderContent = getBuilderByLayout(layoutType)

  const filePath = await builderContent(data);
  const pdfBufferOptions = await getPdfConfigsByLayout(data)

  return { pdfBufferOptions, filePath }
}

module.exports = {
  buildPDF,
}