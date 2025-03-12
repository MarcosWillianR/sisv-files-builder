class ContractHtmlBuilder {
  constructor(data) {
    this.data = data;
    this.content = '';
  }

  getCurrentDate() {
    const date = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options); // Formato DD/MM/AAAA
  }

  build() {
    const currentDate = this.getCurrentDate();

    this.content = `
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 20px;
          color: #333;
        }
        h1 {
          text-align: center;
          color: black;
          font-size: 26px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        .section {
          margin-bottom: 20px;
        }
        .section h2 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }
        .section p, .section ul {
          margin: 0;
          padding: 0;
        }
        .section ul {
          list-style: none;
          padding-left: 20px;
        }
        .section ul li {
          margin-bottom: 5px;
        }
        .highlight {
          font-weight: bold;
        }
        .signature-section {
          margin-top: 30px;
        }
        .signature {
          display: flex;
          justify-content: space-between;
          margin-top: 130px;
        }
        .signature div {
          text-align: center;
          flex: 1;
        }
        .signature div:not(:last-child) {
          margin-right: 20px;
        }
        .signature-line {
          border-top: 1px solid #333;
          margin-top: 40px; 
          padding-top: 10px; 
        }
        .signature div span {
          display: block;
          margin-top: 5px;
          font-size: 14px;
        }
      </style>
      <body>
        <h1>Contrato de Prestação de Serviços</h1>
        <div class="section">
          <h2>Contratante</h2>
          <p>Nome: ${this.data.name ? this.data.name : 'Não informado'}</p>
          <p>CNPJ/CPF: ${this.data.cnpj ? this.data.cnpj : 'Não informado'}</p>
          <p>Endereço: ${this.data.address.street ? this.data.address.street : 'Não informado'}</p>
          <p>Cidade/Estado: ${this.data.address.city ? this.data.address.city : 'Não informado'} / ${this.data.address.state ? this.data.address.state : 'Não informado'}</p>
          <p>Telefone: ${this.data.phone ? this.data.phone : 'Não informado'}</p>
        </div>
        <div class="section">
          <h2>Contratada</h2>
          <p>Nome: CAR DADOS</p>
          <p>CNPJ/CPF: 10.472.656/0001-60</p>
          <p>Endereço: Avenida Copacabana, 177</p>
          <p>Cidade/Estado: Barueri / SP</p>
          <p>Telefone: 11987654321</p>
        </div>
        <div class="section">
          <h2>Objeto do Contrato</h2>
          <p>O presente contrato tem como objeto a prestação de serviços de consulta e vistoria veicular, realizados pela CONTRATADA para a CONTRATANTE, com base nos termos e condições especificados neste documento.</p>
        </div>
        <div class="section">
          <h2>Cláusulas e Condições Gerais</h2>
          <ul>
            <li><strong>Serviços Prestados:</strong> A CONTRATADA se compromete a realizar as vistorias e consultas veiculares conforme solicitado pela CONTRATANTE, garantindo a precisão e eficiência na entrega dos resultados.</li>
            <li><strong>Valores e Pagamentos:</strong> Os serviços prestados serão cobrados conforme a tabela de preços vigente, que será anexada a este contrato. O pagamento deverá ser efetuado até o 5º dia útil após a entrega dos serviços.</li>
            <li><strong>Prazo de Execução:</strong> A CONTRATADA deverá realizar os serviços solicitados no prazo máximo de X dias úteis, salvo acordos específicos em contratos individuais.</li>
            <li><strong>Obrigações das Partes:</strong>
              <ul>
                <li>Contratante: Fornecer todas as informações necessárias para a execução do serviço, como documentação e acesso às plataformas.</li>
                <li>Contratada: Garantir a qualidade dos serviços prestados, bem como a confidencialidade das informações fornecidas.</li>
              </ul>
            </li>
            <li><strong>Rescisão:</strong> O contrato poderá ser rescindido por qualquer uma das partes, mediante aviso prévio de 30 dias.</li>
            <li><strong>Foro:</strong> Fica eleito o foro da comarca de Barueri/SP para dirimir quaisquer dúvidas ou controvérsias oriundas deste contrato.</li>
          </ul>
        </div>
        <div class="signature-section">
          <div class="signature">
            <div>
              <div class="signature-line"></div>
              <span>Contratante</span>
            </div>
            <div>
              <div class="signature-line"></div>
              <span>Contratada</span>
            </div>
          </div>
        </div>
    </body>
    `;
    return this.content;
  }
}

module.exports = ContractHtmlBuilder;
