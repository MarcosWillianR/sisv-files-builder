function getPdfConfigsByLayout(layout) {
  const availableLayoutConfigs = {
    ['LAYOUT_1']: {
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
    },
    ['LAYOUT_2']: {
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
      headerTemplate: "<div></div>",
      footerTemplate: `
        <style>
        .footer {
          -webkit-print-color-adjust: exact;
          height: 32px;
          width: 94%; 
          background-color: #F6AD16;
          position: absolute;
          bottom: 0px;
          left: 50%; /* Centraliza horizontalmente */
          transform: translateX(-50%); /* Ajusta a posição */
          border-bottom-left-radius: 10rem; /* Borda arredondada inferior esquerda */
          border-bottom-right-radius: 10rem; /* Borda arredondada inferior direita */
        }
        </style>
        <div class='footer'></div>
      `,
    },
    ['LAYOUT_3']: {
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
    }
  }
  return availableLayoutConfigs[layout];
}


module.exports = { getPdfConfigsByLayout };