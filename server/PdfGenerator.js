const puppeteer = require('puppeteer');
const DataProcessor = require('./DataProcessor');
const QRCode = require('qrcode');
const fs = require('fs');

class PdfGenerator {
  constructor(data) {
    this.dataProcessor = new DataProcessor(data);
  }

  async generateContract() {
    const htmlContent = this.dataProcessor.generateContractHtml();

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({
      format: 'A4',               
      printBackground: true,      
      displayHeaderFooter: true,
      margin: {
        top: '20mm',              
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: right; color: #555; padding-right: 20px;">
          Data: <span class="date"></span>
        </div>
      `,
      preferCSSPageSize: true,
    });

    await browser.close();

    return pdfBuffer;
  }

  async generatePrivacyPolicy() {
    const htmlContent = this.dataProcessor.generatePrivacyPolicyHtml();

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({
      format: 'A4',               
      printBackground: true,      
      displayHeaderFooter: true,
      margin: {
        top: '20mm',              
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: right; color: #555; padding-right: 20px;">
          Data: <span class="date"></span>
        </div>
      `,
      preferCSSPageSize: true,   
    });

    await browser.close();

    return pdfBuffer;
  }

  async generateTerms() {
    const htmlContent = this.dataProcessor.generateTermsHtml();

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({
      format: 'A4',               
      printBackground: true,      
      displayHeaderFooter: true,
      margin: {
        top: '20mm',              
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: right; color: #555; padding-right: 20px;">
          Data: <span class="date"></span>
        </div>
      `,
      preferCSSPageSize: true,   
    });

    await browser.close();

    return pdfBuffer;
  }

  async generatePdf() {
    const headerContent = this.dataProcessor.generateHeader();
    const htmlContent = this.dataProcessor.generateHtml();

    const pdfLink = `http://sisv.prod.ezzapi.com.br/laudo_veiculo-${this.dataProcessor.data.id}.pdf`;

    const qrCodeDataUrl = await QRCode.toDataURL(pdfLink);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const header = await browser.newPage();

    const headerWithQrCode = headerContent
      .replace(
        '<div class="payment">',
        `<div class="payment"><img style="align-content: center;" src="${qrCodeDataUrl}" alt="QR Code" />`
      );

    await header.setContent(headerWithQrCode);

    const headerElement = await header.$(`.header`);
    const headerScreenshot = await headerElement.screenshot({
      encoding: 'base64',
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent);


    const pdfBuffer = await page.pdf({
      format: 'A4',               
      printBackground: true,      
      displayHeaderFooter: true,
      headerTemplate: `
      <div style="padding-left: 10mm; padding-right: 10mm">
        <img src="data:image/png;base64,${headerScreenshot}"/>
      </div>
    `,      margin: {
        top: '205px',              
        right: '10mm',
        bottom: '0mm',
        left: '10mm'
      },
      preferCSSPageSize: true,   
    });

    await browser.close();

    return pdfBuffer;
  }
}

module.exports = PdfGenerator;

