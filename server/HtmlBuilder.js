class HtmlBuilder {
  constructor(data) {
    this.data = data;
    this.content = '';
  }

  buildCss() {
    const { primaryColor, secondColor, primaryFontColor, secondFontColor } = this.data.customizationConfig;
    const statusColor = this.data.approvalStatus.color;
    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,460;1,460&display=swap');

        :root {
          --primaryColor: ${primaryColor};
          --secondaryColor: ${secondColor};
          --primaryFontColor: ${primaryFontColor};
          --secondaryFontColor: ${secondFontColor};
          --borderColor: #E5E7EB;
          --backgroundColor: #F9FAFB;
          --statusColor: ${statusColor}
        }

        body {
          font-family: Arial, sans-serif;
          margin: 0px;
          padding: 0px;
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
        .logo {
          width: 100%;
        }

        .payment {
          display: flex;
          justify-content: center;
          align-items: center; 
          margin-right: 25px;
        }

        .payment img {
          width: 25mm;
        }

        .status {
          width: 100%;
          display: inline-block;
          align-self: center;
          text-align: center;
        }

        .situation {
          width: 100%;  
          height: 50px;
          background-color: var(--statusColor);
          align-content: center;
        }

        .situation span {
          margin-left: 0px;
          font-size: 19px;
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

        .row.photos {
          margin-top: 10px
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start; 
        }

        .row.photos .item {
          flex: 0 0 32.1%; 
          box-sizing: border-box;
        }

        .row.photos .item:nth-child(3n+1) {
          margin-left: 0;
        }

        .row.photos .item:nth-child(3n+2) {
          margin-left: 10px;
        }

        .row.photos .item:nth-child(3n) {
          margin-left: 10px;
        }

        /* TOPICOS */
        .topic {
            width: 100%;
            height: 30px;
            background-color: var(--secondaryColor);
            align-content: center;
        }

        .topic span {
            font-size: 16px;
            color: var(--secondaryFontColor)
        }

        .topic-info {
          margin-top: 5px;
        }

        .topic-info span {
          font-size: 14px;
        }

        /* INFOS */
        .info-title {
          margin-top: 15px;
          width: 100%;
          min-height: 25px;
          word-wrap: break-word;
          background-color: var(--primaryColor);
        }

        .info-title span {
          color: var(--primaryFontColor);
          font-size: 15px;
        }

        .info-item span{
          display: block; 
          border-bottom: 2px solid var(--primaryColor);
        }

         .second-info-title{
          margin-top: 15px;
          width: 100%;
          min-height: 30px;
          word-wrap: break-word;
          background-color: var(--secondaryColor);
          align-content: center;
        }

        .second-info-title span {
          color: var(--secondaryFontColor);
          font-size: 16px;
        }

        .primary-info-title{
          margin-top: 15px;
          width: 100%;
          min-height: 30px;
          word-wrap: break-word;
          background-color: var(--primaryColor);
          align-content: center;
        }

        .primary-info-title span {
          color: var(--primaryFontColor);
          font-size: 16px;
        }

        .second-info-item span{
          display: block; 
          border-bottom: 2px solid var(--secondaryColor);
        }

        /* ITENS */
        .item-title {
          word-break: break-word;
          min-height: 25px;
          font-weight: bold;
          margin-top: 10px;
          width: 100%;
          background-color: var(--primaryColor);
        }

        .item-title span {
          padding-left: 7px;
          margin: Opx;
          color: rgba(246, 240, 247, 255);
          font-size: 12px;
        }

        .item-image img{
          width: 100%;
          height: 150px;
        }

        .item-image-two img{
          width: 100%;
          height: 250px;
        }

        /* OBSERVACAO */
        .item-note {
            padding: 15px;
            min-height: 80px;
            border: 2px solid var(--primaryColor);
            margin-bottom: 30px;
        }

        .second-item-note {
            padding: 15px;
            min-height: 80px;
            border: 2px solid var(--secondaryColor);
            margin-bottom: 30px;
        }

        /* ASSINATURA */
        .footer-signature {
          margin-top: 150px;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
        }

        .signature-field {
            width: 100%; 
            text-align: center; 
        }

        .signature-line {
          border-bottom: 1px solid #000; 
          width: 100%; 
          margin-bottom: 10px; 
        }

        .signature-text {
          font-size: 18px; 
          font-weight: bold;
          margin: 2px 0; 
        }

        .signature-position {
          font-size: 15px;
          margin: 2px 0; 
        }

        .signature-image {
          max-width: 100%;
          width: 150px; 
          height: 80px; 
          object-fit: contain;
        }

        .footer-infos {
          margin-top: 55px;
          display: grid;
          justify-items: center;
        }

        .footer-infos span{
          font-size: 14px;
          line-height: normal;
          font-weight: normal;
        }

        .row-rating {
          display: grid;
          grid-template-columns: repeat(2, 1fr); 
          gap: 10px; 
        }

        .row-rating .rating {
          padding: 10px;
        }

        .rating-title {
          margin-top: 5px;
          width: 100%;
          background-color:rgb(215, 215, 215);
        }

        .rating-title span {
          font-size: 16px;
        }

        .rating-description span {
          font-size: 16px;
          display: block;
          margin-top: 10px;
          margin-left: 16px;
        }

        .legal-info,
        .row,
        .row-rating,
        .observation,
        .rating,
        .item
        {
          page-break-inside: avoid;
        }

        .row-rating,
        .legal-info {
          page-break-before: always;
        }
      </style>
    `;
  }
  buildHeader() {
    const { createDate, completeDate, expertName } = this.data;
    const logoUrl = this.data.customizationConfig.s3File.url;
    const statusText = this.data.approvalStatus.name;
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Laudo Veículo</title>
          ${this.buildCss()}
          
      </head>
      <body>
    `;
  }

  buildTwoFirsts(group) {
    const firstTwoParts = group.data.slice(0, 2); // Obtém os dois primeiros itens
    return `
    <div class="row">
      <div class="left">
        <div class="item-title" style="border-bottom: 5px solid ${firstTwoParts[0]?.ratings.find(rating => rating.isSelected === true)?.color || ''};">
          <span>${firstTwoParts[0]?.name || "Sem nome"}</span>
        </div>
        <div class="item-image-two">
          <img src="${firstTwoParts[0]?.s3File?.url || "assets/uno.jpeg"}"/>
        </div>
      </div>
      ${firstTwoParts[1] ? `
      <div class="right">
        <div class="item-title" style="border-bottom: 5px solid ${firstTwoParts[1]?.ratings.find(rating => rating.isSelected === true)?.color || ''};">
          <span>${firstTwoParts[1]?.name || "Sem nome"}</span>
        </div>
        <div class="item-image-two">
          <img src="${firstTwoParts[1]?.s3File?.url || "assets/uno2.jpeg"}"/>
        </div>
      </div>` : ''}
    </div>
  `;
  }

  buildGroup(group) {
    switch (group.groupType) {
      case 'DATA':
        return this.buildDataGroup(group);
      case 'PARTS':
        return this.buildPartsGroup(group);
      case 'OBSERVATION':
        return this.buildObservationGroup(group);
      default:
        return '';
    }
  }

  buildDataGroup(group) {
    return `
      <div class="row" style="margin-bottom: 15px;">
        <div class="left">
          <div class="info-title">
            <span>Dados do veículo:</span>
          </div>
          <div class="info-item">
            <span>Placa: ${this.data.inspectionVehicleData.data.licensePlate || 'NÃO INFORMADO'}</span>
            <span>Chassi: ${this.data.inspectionVehicleData.data.chassis || 'NÃO INFORMADO'}</span>
            <span>Motor: ${this.data.inspectionVehicleData.data.engineNumber || 'NÃO INFORMADO'}</span>
            <span>Cor: ${this.data.inspectionVehicleData.data.color || 'NÃO INFORMADO'}</span>
            <span>Combustivel: ${this.data.inspectionVehicleData.data.fuelType || 'NÃO INFORMADO'}</span>
            <span>Câmbio: ${this.data.inspectionVehicleData.data.vehicleType || 'NÃO INFORMADO'}</span>
            <span>KM: ${this.data.inspectionVehicleData.data.km || 'NÃO INFORMADO'}</span>
            <span>GRV/Lote: ${this.data.inspectionVehicleData.data.grv || 'NÃO INFORMADO'}</span>

          </div>
        </div>
        <div class="right">
          <div class="info-title">
            <span>Dados cadastrais:</span>
          </div>
          <div class="info-item">
            <span>Placa: ${group.data.licensePlate || 'NÃO INFORMADO'}</span>
            <span>Chassi: ${group.data.chassis || 'NÃO INFORMADO'}</span>
            <span>Motor: ${group.data.engineNumber || 'NÃO INFORMADO'}</span>
            <span>Cor: ${group.data.color || 'NÃO INFORMADO'}</span>
            <span>Combustivel: ${this.data.fuelType || 'NÃO INFORMADO'}</span>
            <span>Câmbio: ${group.data.vehicleType || 'NÃO INFORMADO'}</span>
            <span>Ano: ${group.data.yearManufactureModel || 'NÃO INFORMADO'}</span>
            <span>UF/Municipio: ${group.data.state ? group.data.state : 'NÃO INFORMADO'} / ${group.data.city ? group.data.city : 'NÃO INFORMADO'}</span>
          </div>
        </div>
      </div>
    `;
  }


  buildPartsGroup(group) {
    const itemsFiltered = group.data.filter(item => !item.isPlaceholder);
    return `
    <div class="row photos">
      ${itemsFiltered.map(part => `
        <div class="item">
          <div class="item-title" style="border-bottom: 5px solid ${part?.ratings.find(rating => rating.isSelected === true)?.color || ''};"><span>${part.name}</span></div>
          <div class="item-image">
            <img src="${part?.s3File?.url || ''}"/>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  }


  buildRatings(items) {

    const hasSelectedRatings = items.some(item =>
      item.ratings.some(rating => rating.isSelected) ||
      (item.type === 'EXTRA' && item.observation !== '')
    );

    if (!hasSelectedRatings) {
      return '';
    }

    return `
          <div class="row-rating">
            ${items.map(item => {
              //AQUI EU TO CHECANDO SE O ITEM É EXTRA PARA USAR O OBSERVATION AO INVÉS DOP RATINGS.
              if (item.type === 'EXTRA') {
                return `
                  <div class="rating">
                    <div class="rating-title" style="border-left: 16px solid gray;">
                      <span>${item.name}</span>
                    </div>
                    <div class="rating-description">
                      <span>${item.observation}</span>
                    </div>
                  </div>
                `;
              }

              return item.ratings
                ?.filter(rating => rating.isSelected)
                .map(rating => `
                  <div class="rating">
                    <div class="rating-title" style="border-left: 16px solid ${rating.color};">
                      <span>${item.name}</span>
                    </div>
                    <div class="rating-description">
                      <span>${rating.name}</span>
                    </div>
                  </div>
                `).join('');
            }).join('')}
          </div>
        `;
  }


  buildObservationGroup(group) {
    return `
        <div class="observation">
          <div class="second-info-title">
            <span>Observações:</span>
          </div>
          <div class="second-item-note" style="text-transform: uppercase;">
            <p>KM: ${group.data.km || 'Não informado'}</p>
            <p>${group.data.textObservation || ''}</p>
          </div>
        </div>
      `;
  }

  buildSignatureSection(notes, expert, analyst, unit) {
    const defaultExpert = { name: 'Nome do Vistoriador', signature: null, cpf: 'N/A' };
    const defaultAnalyst = { name: 'Nome do Analista', signature: null, cpf: 'N/A' };

    expert = expert || defaultExpert;
    analyst = analyst || defaultAnalyst;
    return `
      <div class="legal-info">
       <div class="primary-info-title">
            <span class>Importante:</span>
        </div>
        <div class="item-note">${notes || 'Este laudo trata-se da vistoria cautelar do veículo, possuindo caráter informativo da análise de itens, conforme padrões estabelecidos pelas fabricantes.'}</div>
        <div class="footer-signature">
        <div class="row">
            <div class="left">
              <div class="signature-field">
                <div class="signature-image-container">
                  ${expert.signature ? `
                    <img 
                      src="${expert.signature}" 
                      alt="Assinatura do Perito" 
                      class="signature-image"
                      onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                    />
                  ` : `
                    <div style="margin-top: 65px; color: #DC2626; text-align: center;">Assinatura não disponível</div>
                  `}
                </div>
                <div class="signature-line"></div>
                <p class="signature-text" style="text-transform: capitalize;">${expert.firstName ? expert.firstName : 'Não informado'} ${expert.lastName ? expert.lastName : ''}</p>
                <p class="signature-text">CPF: ${expert.cpf ? expert.cpf : 'Não informado'}</p>
                <p class="signature-position">Perito Automotivo</p>
              </div>
            </div>
            <div class="right">
              <div class="signature-field">
                <div class="signature-image-container">
                  ${analyst.signature ? `
                    <img 
                      src="${analyst.signature}" 
                      alt="Assinatura do Analista" 
                      class="signature-image"
                      onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                    />
                  ` : `
                    <div style="margin-top: 65px; color: #DC2626; text-align: center;">Assinatura não disponível</div>
                  `}
                </div>
                <div class="signature-line"></div>
                <p class="signature-text" style="text-transform: capitalize;">${analyst.firstName ? analyst.firstName : 'Não informado'} ${analyst.lastName ? analyst.lastName : ''}</p>
                <p class="signature-text">CPF: ${analyst.cpf ? analyst.cpf : 'Não informado'}</p>
                <p class="signature-position">Analista</p>
              </div>
            </div>

        </div>

          <div class="footer-infos">
            ${unit.name ? `<span>Unidade: ${unit.name}</span>` : ''}
            ${unit.phone || unit.email ? `<span>Telefone e e-mail: ${unit.phone || ''} ${unit.phone && unit.email ? '/' : ''} ${unit.email || ''}</span>` : ''}
            ${unit.address ? `<span>Endereço: ${unit.address.street}, ${unit.address.city} - ${unit.address.state} |  CEP: ${unit.address.zipCode}</span>` : ''}
            ${unit.cnpj ? `<span>CNPJ: ${unit.cnpj}</span>` : ''}
          </div>
        </div>
      </div>
  `;
  }

  build() {
    this.content = this.buildHeader();

    this.data.groups.sort((a, b) => a.printOrder - b.printOrder);

    const partsGroups = this.data.groups.filter(group => group.groupType === 'PARTS');

    partsGroups.forEach(group => {
      group.data.sort((a, b) => a.printOrder - b.printOrder);
    });

    const dataGroupIndex = this.data.groups.findIndex(group => group.groupType === 'DATA');

    if (dataGroupIndex !== -1) {
      const [dataGroup] = this.data.groups.splice(dataGroupIndex, 1);

      this.content += this.buildGroup(dataGroup);
    }

    this.content += this.buildTwoFirsts(partsGroups[0]);

    const items = this.data.groups
      .filter(group => group.groupType === 'PARTS')
      .flatMap(group => group.data);

    partsGroups[0].data.splice(0, 2);

    this.data.groups.forEach(group => {
      this.content += this.buildGroup(group);
    });

    this.content += this.buildRatings(items);

    this.content += this.buildSignatureSection(this.data.notes, this.data.expert, this.data.analyst, this.data.unit);

    if (this.data.expertSignature != null) {
    }
    this.content += '</body></html>';
    return this.content;
  }
}

module.exports = HtmlBuilder;

