class HeaderBuilder {
  constructor(data) {
    this.data = data;
    this.content = '';
  }

  buildCss() {
    return `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,460;1,460&display=swap');
  
          body {
            font-family: Arial, sans-serif;
            margin: 0px;
            background: white;
            line-height: 1.5;
            font-size: 14px;
          }
  
          span {
            display: inline-block; 
            font-weight: bold;
            font-size: 15px;
            margin-left: 0px;
            padding-left: 14px;
            line-height: 1.6;
          }
  
          /* Header styling */
  
          .header {
            width: 90%;
            justify-self: center; 
            max-height: 240px;
          }
          .main-logo {
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          .logo {
            max-height: 80px; 
            width: auto; 
            height: auto; 
            display: block; 
          }
  
          .payment {
            display: flex;
            justify-content: center; /* Alinha horizontalmente */
            align-items: center; 
            margin-right: 25px;
          }
  
          .payment img {
            width: 22mm;
          }
  
          .status {
            width: 100%;
            display: inline-block;
            align-self: center;
            text-align: center;
          }
  
          .situation {
            display: flex;
            justify-content: center; /* Alinha horizontalmente */
            align-items: center; 
            width: 100%;  
            height: 45px;
            background-color: var(--statusColor);
          }
  
          .situation span {
            margin-left: 0px;
            padding-left: 0px;
            font-size: 16px;
            color: var(--primaryFontColor);
          }
  
          /* Divs para botar infos */
          .row {
            display: flex; 
            justify-content: space-between; 
            box-sizing: border-box;
          }
  
          .left, .right {
            width: 48%; 
            box-sizing: border-box;
          }
  
          /* TOPICOS */
          .topic {
            margin-top: 15px;
            width: 100%;
            max-height: 8mm;
            background-color: var(--secondaryColor);
            align-content: center;
          }
  
          .topic span {
            font-size: 16px;
            color: var(--secondaryFontColor)
          }
  
          .topic-info {
            max-height: 25mm;
          }
  
          .topic-item {
            margin-top: 5px;
          }
  
          .topic-item span {
            text-transform: uppercase;
            font-size: 13px;
          }
        </style>
      `;
  }

  buildHeader() {
    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Laudo Veículo</title>
            
            
        </head>
        <body>
        <div class='header'>
        CONTEUDO DO HEADER
        ASDHUASHDUASDAS
        ASHUDASHUDAS
                CONTEUDO DO HEADER
        ASDHUASHDUASDAS
        ASHUDASHUDAS
                CONTEUDO DO HEADER
        ASDHUASHDUASDAS
        ASHUDASHUDAS
                CONTEUDO DO HEADER
        ASDHUASHDUASDAS
        ASHUDASHUDAS
        </div>
        </body>
        </html>
      `;
  }

  build() {
    this.content = this.buildHeader();
    return this.content;
  }

  getContent() {
    return this.content;
  }
}

export default HeaderBuilder;

