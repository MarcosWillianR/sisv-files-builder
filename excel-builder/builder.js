const ExcelJS = require('exceljs');
const { getValueByPath, applyStylesToSheet } = require('./Helpers/TimesheetHelper');

class ExcelBuilder {
    constructor(data, columns, options = {}) {
        this.data = data;
        this.columns = columns;
        this.sheetName = options.sheetName || "Planilha1";
        this.fileName = options.fileName || `report_${Date.now()}.xlsx`;
        this.applyStyles = options.applyStyles || false;
    }

    async build(outputPath) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(this.sheetName);

        worksheet.columns = [
            ...this.columns.map(col => ({
                header: col.label,
                key: col.key,
                width: this.calculateColumnWidth(col)
            }))
        ];

        this.data.forEach((item, index) => {
            let row = { ID: index + 1 };
            this.columns.forEach(col => {
                row[col.key] = getValueByPath(item, col.key);
            });
            worksheet.addRow(row);
        });

        if (this.applyStyles) applyStylesToSheet(worksheet);
        await workbook.xlsx.writeFile(outputPath);
        return this.fileName;
    }

    calculateColumnWidth(col) {
        const maxLength = Math.max(
            col.label.length,
            ...this.data.map(item => {
                const cellValue = getValueByPath(item, col.key);
                return cellValue ? cellValue.toString().length : 0;
            })
        );
        return maxLength + 2;
    }
}

module.exports = ExcelBuilder;
