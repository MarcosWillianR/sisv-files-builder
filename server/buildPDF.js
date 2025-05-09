const { getPdfConfigsByLayout } = require("./helpers/pdf-config");

const { Layout1Builder } = require("./helpers/builders/layout1-builder");
const { Layout2Builder } = require("./helpers/builders/layout2-builder");
const { Layout3Builder } = require("./helpers/builders/layout3-builder");

function getBuilderByLayout(layout) {
  const availableLayouts = {
    LAYOUT_1: Layout1Builder,
    LAYOUT_2: Layout2Builder,
    LAYOUT_3: Layout3Builder,
  };
  return availableLayouts[layout];
}

async function buildPDF(data) {
  const layoutType = data.layout;
  const builderContent = getBuilderByLayout(layoutType);
  const filePath = await builderContent(data);
  const pdfBufferOptions = await getPdfConfigsByLayout(data);

  return { pdfBufferOptions, filePath };
}

module.exports = {
  buildPDF,
};
