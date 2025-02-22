function setPdfConfigs(layout) {
  const availableLayoutConfigs = {
    LAYOUT_01: {
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
    },
    LAYOUT_02: {
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
    },
    LAYOUT_03: {
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
}