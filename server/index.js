const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const { generateCustomHtml } = require('./helpers/build-pdf')
const { deleteFile } = require('./helpers');
const ExcelBuilder = require("../excel-builder/builder");
const {buildInspectionData} = require("../excel-builder/Helpers/InspectionReportHelper");
const fs = require("fs");

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
      scale: 1,
      margin: {
        top: '2mm',              
        right: '5mm',
        bottom: '2mm',
        left: '5mm'
      },
      preferCSSPageSize: true, 
      // headerTemplate: "<div style='width: 100%; height: 50px; background-color: #F6AD16;'></div>",
      // footerTemplate: "<div style='width: 100%; height: 50px; background-color: #F6AD16;'></div>"
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

app.post("/timesheet-report", async (req, res) => {
  try {
    const { inspections, inspectionColumns } = buildInspectionData(req.body);

    const fileName = `relatorio_vistoria_${req.body.id}.xlsx`;
    const filePath = path.join(__dirname, fileName);

    const excelBuilder = new ExcelBuilder(inspections, inspectionColumns, {
      sheetName: "Relatório de Vistoria",
      fileName,
      applyStyles: true
    });

    await excelBuilder.build(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(fileBuffer);
    fs.unlinkSync(filePath);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});