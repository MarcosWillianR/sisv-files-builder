const ContractHtmlBuilder = require('./ContractHtmlBuilder');
const PrivacyPolicyHtmlBuilder = require('./PrivacyPolicyHtmlBuilder');
const TermsHtmlBuilder = require('./TermsHtmlBuilder');
const puppeteer = require("puppeteer");

class TermsContractPolicyBuilder {
    constructor(data) {
        this.data = data;
    }

    async generateContract() {
        const builder = new ContractHtmlBuilder(this.data);
        const htmlContent = builder.build();

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
        const builder = new PrivacyPolicyHtmlBuilder(this.data);
        const htmlContent = builder.build();

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
        const builder = new TermsHtmlBuilder(this.data);
        const htmlContent = builder.build();

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
}

module.exports = TermsContractPolicyBuilder;
