const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const { generateCustomHtml } = require('./helpers/build-pdf')
const { deleteFile } = require('./helpers')

const app = express();
app.use(express.json());
const PORT = 3000;

app.post("/pdf", async (req, res) => {
  try {
    const { name } = req.body

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    const filePath = await generateCustomHtml({ name })

    await page.goto(`file://${filePath}`, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ 
      format: 'A4',               
      printBackground: true,      
      displayHeaderFooter: true,
      preferCSSPageSize: true,
      scale: 1,
      margin: {
        top: '2mm',              
        right: '0mm',
        bottom: '2mm',
        left: '0mm'
      },
      headerTemplate: `
        <style>
          .header {
            -webkit-print-color-adjust: exact;
            height: 25px;
            background: #F6AD16;
            position: absolute;
            top: 0px; 
            left: 0px; 
            right: 0px;
          }
        </style>
        <div class='header'></div>
      `,
      footerTemplate: `
        <style>
          .footer {
            -webkit-print-color-adjust: exact;
            height: 25px;
            background-color: #F6AD16;
            position: absolute;
            bottom: 0px; 
            left: 0px; 
            right: 0px;
          }
        </style>
        <div class='footer'></div>
      `,
    });
    await browser.close();

    await deleteFile(filePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=pagina.pdf");
    res.end(pdfBuffer);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    res.status(500).send("Erro interno ao gerar o PDF");
  }
});

app.post("/inspection-report", async (req, res) => {

});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});