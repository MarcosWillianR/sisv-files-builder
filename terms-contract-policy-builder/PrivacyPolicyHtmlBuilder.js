class PrivacyPolicyHtmlBuilder {
  constructor(data) {
    this.data = data;
    this.content = '';
  }

  build() {
    this.content = `
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Política de Privacidade</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #444;
            margin: 0;
            padding: 0 20px;
          }
          h2, h3 {
            color: #444;
          }
          a {
            color: #444;
            text-decoration: none;
          }
          ul {
            margin: 10px 0;
            padding: 0 20px;
          }
          li {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <h2>Política de Privacidade</h2>
        <p>A sua privacidade é importante para nós. É política da CARDADOS respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href="https://sisv.com.br/">SISV</a>, e outros sites que possuímos e operamos.</p>
        <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
        <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
        <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
        <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas <a href="https://politicaprivacidade.com/" rel="noopener noreferrer" target="_blank">políticas de privacidade</a>.</p>
        <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
        <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.</p>
        <h3>Compromisso do Usuário</h3>
        <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o SISV oferece no site e com caráter enunciativo, mas não limitativo:</p>
        <ul>
          <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
          <li>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
          <li>C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do SISV, de seus fornecedores ou terceiros.</li>
        </ul>
        <h3>Mais informações</h3>
        <p>Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</p>
        <p>Esta política é efetiva a partir de 6 de Janeiro de 2025.</p>
      </body>
      </html>
    `;
    return this.content;
  }
}

module.exports = PrivacyPolicyHtmlBuilder;
