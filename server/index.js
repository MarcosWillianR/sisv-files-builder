const express = require("express");
const puppeteer = require("puppeteer");
const { deleteFile, customColorsStyleTag, saveJsonToFile } = require("./helpers");
const { processTimesheet } = require("../excel-builder/src");

const { buildPDF } = require("./buildPDF");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.json({ limit: "100mb" }));
app.use((req, res, next) => {
  req.setTimeout(60000, () => {
    console.log("Request timed out.");
    res.status(408).send("Request Timeout");
  });
  next();
});

app.post("/pdf", async (req, res) => {
  try {
    // await saveJsonToFile(req.body, __dirname);

    const { pdfBufferOptions, filePath } = await buildPDF(req.body);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(`file://${filePath}`, { waitUntil: "networkidle0" });
    await page.addStyleTag({ content: customColorsStyleTag(req.body) });
    const pdfBuffer = await page.pdf(pdfBufferOptions);

    await browser.close();
    await deleteFile(filePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=pagina.pdf");
    res.end(pdfBuffer);

    console.log("PDF gerado com sucesso.");
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    res.status(500).send("Erro interno ao gerar o PDF");
  }
});

app.post("/timesheet-report", async (req, res) => {
  await processTimesheet(req, res);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
