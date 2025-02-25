const { getHeaderScreenshot } = require('./index.js');

async function getPdfConfigsByLayout(reqbody, layout) {
    const availableLayoutConfigs = {
      LAYOUT_1: {
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        preferCSSPageSize: true,
        scale: 1,
        margin: {
          top: "2mm",
          right: "0mm",
          bottom: "2mm",
          left: "0mm",
        },
        headerTemplate: `
          <div>
            <img src="data:image/png;base64,${await getHeaderScreenshot(reqbody, "LAYOUT_1")}" />
          </div>`,
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
      },
      LAYOUT_2: {
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        preferCSSPageSize: true,
        scale: 1,
        margin: {
          top: "2mm",
          right: "0mm",
          bottom: "2mm",
          left: "0mm",
        },
        headerTemplate: `
        <div>
          <img src="data:image/png;base64,${await getHeaderScreenshot(reqbody, "LAYOUT_2")}" />
        </div>`,
        footerTemplate: `
            <style>
              .footer {
                -webkit-print-color-adjust: exact;
                height: 32px;
                width: 94%;
                background-color: #F6AD16;
                position: absolute;
                bottom: 0px;
                left: 50%;
                transform: translateX(-50%);
                border-bottom-left-radius: 10rem;
                border-bottom-right-radius: 10rem;
              }
            </style>
            <div class='footer'></div>
          `,
      },
      LAYOUT_3: {
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        preferCSSPageSize: true,
        scale: 1,
        margin: {
          top: "2mm",
          right: "0mm",
          bottom: "2mm",
          left: "0mm",
        },
        headerTemplate: `<div></div>`,
        footerTemplate: `
            <style>
              .footer {
                -webkit-print-color-adjust: exact;
                height: 32px;
                width: 94%;
                background-color: #F6AD16;
                position: absolute;
                bottom: 0px;
                left: 50%;
                transform: translateX(-50%);
                border-bottom-left-radius: 10rem;
                border-bottom-right-radius: 10rem;
              }
            </style>
            <div class='footer'></div>
          `,
      },
    };
  return availableLayoutConfigs[layout];
}



module.exports = { getPdfConfigsByLayout };