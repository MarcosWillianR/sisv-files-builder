const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const { deleteFile, customColorsStyleTag, saveJsonToFile, compressPDFWithGhostscript } = require("./helpers");
const { processTimesheet } = require("../excel-builder/src");
const { buildPDF } = require("./buildPDF.js");
const TermsContractPolicyBuilder = require("../terms-contract-policy-builder");
const { PDFDocument } = require("pdf-lib");

const PORT = 4715;
const app = express();

app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "1000mb", extended: true }));
app.use((req, res, next) => {
  req.setTimeout(240000, () => {
    console.log("Request timed out.");
    res.status(408).send("Request Timeout");
  });
  next();
});

app.post("/pdf", async (req, res) => {
  try {
    const jsonPath = path.join(__dirname, "data.json");
    await saveJsonToFile(req.body, jsonPath);

    const { pdfBufferOptions, filePath, historyFilePath } = await buildPDF(req.body);

    const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });

    const mainPage = await browser.newPage();
    await mainPage.goto(`file://${filePath}`, { waitUntil: "networkidle0", timeout: 60000 });
    await mainPage.addStyleTag({ content: customColorsStyleTag(req.body) });
    const mainPdfBuffer = await mainPage.pdf({ ...pdfBufferOptions, timeout: 60000 });

    let mergedPdfBuffer = mainPdfBuffer;

    if (historyFilePath) {
      const historyPage = await browser.newPage();
      await historyPage.goto(`file://${historyFilePath}`, { waitUntil: "networkidle0", timeout: 60000 });
      const historyPdfBuffer = await historyPage.pdf({ ...pdfBufferOptions, timeout: 60000 });

      const mainPdfDoc = await PDFDocument.load(mainPdfBuffer);
      const historyPdfDoc = await PDFDocument.load(historyPdfBuffer);
      const copiedPages = await mainPdfDoc.copyPages(historyPdfDoc, historyPdfDoc.getPageIndices());
      copiedPages.forEach((page) => mainPdfDoc.addPage(page));
      mergedPdfBuffer = await mainPdfDoc.save();
    }

    const compressedBuffer = await compressPDFWithGhostscript(mergedPdfBuffer);

    await browser.close();
    await deleteFile(filePath);
    await deleteFile(historyFilePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=pagina.pdf");
    res.end(compressedBuffer);
    console.log("PDF gerado com sucesso.");
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    res.status(500).send("Erro interno ao gerar o PDF");
  }
});

app.post("/timesheet-report", async (req, res) => {
  await processTimesheet(req, res);
});

app.post("/contract-pdf", async (req, res) => {
  const data = req.body;
  const builder = new TermsContractPolicyBuilder(data);
  try {
    const pdfBuffer = await builder.generateContract();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=pagina.pdf");
    res.end(pdfBuffer);
  } catch (err) {
    console.error("Erro ao gerar contrato: ", err);
    res.status(500).send({ mensagem: "Erro ao gerar PDF", erro: err.message });
  }
});

app.post("/policy-pdf", async (req, res) => {
  const data = req.body;
  const builder = new TermsContractPolicyBuilder(data);
  try {
    const pdfBuffer = await builder.generatePrivacyPolicy();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=pagina.pdf");
    res.end(pdfBuffer);
  } catch (err) {
    console.error("Erro ao gerar Politica de privacidade: ", err);
    res.status(500).send({ mensagem: "Erro ao gerar PDF", erro: err.message });
  }
});

app.post("/terms-pdf", async (req, res) => {
  const data = req.body;
  const builder = new TermsContractPolicyBuilder(data);
  try {
    const pdfBuffer = await builder.generateTerms();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=pagina.pdf");
    res.end(pdfBuffer);
  } catch (err) {
    console.error("Erro ao gerar termos: ", err);
    res.status(500).send({ mensagem: "Erro ao gerar PDF", erro: err.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
