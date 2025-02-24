  const QRCode = require('qrcode');
  const fs = require('fs').promises;      
  const puppeteer = require('puppeteer');

  async function getHeaderScreenshot(layout) {
    const headerBuilder = await getHeaderBuilder(layout);
    headerBuilder.build(); // Gera o HTML do cabeçalho
  
    const headerContent = headerBuilder.getContent(); // Obtém o HTML gerado
    
    const pdfLink = `http://sisv.prod.ezzapi.com.br/laudo_veiculo-${layout}.pdf`;
    const qrCodeDataUrl = await QRCode.toDataURL(pdfLink);
  
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  
    const headerPage = await browser.newPage();
    
    // Definir o conteúdo da página
    await headerPage.setContent(headerContent);
    await headerPage.waitForSelector('.header'); // Aguarda o elemento aparecer
  
    const headerElement = await headerPage.$('.header'); // Obtém a referência do elemento
  
    const headerScreenshot = await headerElement.screenshot({
      encoding: 'base64',
    });

    await browser.close();
    return headerScreenshot;
  }
  
  async function getHeaderBuilder(layout) {
    let HeaderBuilder;
  
    if (layout === 'LAYOUT_2') {
      HeaderBuilder = (await import('../../client2/src/components/builders/HeaderBuilder.js')).default;
    } else if (layout === 'LAYOUT_3') {
      HeaderBuilder = (await import('../../client3/src/components/builders/HeaderBuilder.js')).default;
    } else {
      throw new Error(`LAYOUT inválido: ${layout}`);
    }
  
    return new HeaderBuilder(); // Retorna a instância corretamente
  }
  
  async function deleteFile(filePath) {
    try {
      await fs.unlink(filePath);
      console.log("Arquivo removido com sucesso!");
    } catch (err) {
      console.error("Erro ao remover o arquivo:", err);
    }
  }

  async function saveJsonToFile(jsonData, filePath) {
    try {
      const jsonString = JSON.stringify(jsonData, null, 2); // Converte o JSON para string com indentação
      await fs.writeFile(filePath, jsonString); // Salva o JSON no caminho especificado
      console.log("Arquivo salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar o arquivo:", err);
    }
  }

  module.exports = {
    deleteFile,
    saveJsonToFile,
    getHeaderScreenshot
  }