const ExcelBuilder = require("../builder");
const {buildInspectionData} = require("../Helpers/InspectionReportHelper");
const fs = require("fs");
const path = require("path");

async function processTimesheet(req, res) {
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
};


module.exports = {processTimesheet};