const xlsx = require('xlsx-style');


function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || "";
}

function applyStylesToSheet(worksheet) {
    // Estilizar cabeçalhos
    worksheet.getRow(1).eachCell(cell => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "000000" } };
        cell.alignment = { horizontal: "center", vertical: "middle" };
    });
}


module.exports = {getValueByPath, applyStylesToSheet}