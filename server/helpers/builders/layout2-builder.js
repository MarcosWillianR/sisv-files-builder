const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cheerio = require("cheerio");
const { getClientName } = require("../../helpers");

const TEMP_DIR = path.join(__dirname, "temp");

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// buildGroup(group) {
//   switch (group.groupType) {
//     case 'DATA':
//       return this.buildDataGroup(group);
//     case 'PARTS':
//       return this.buildPartsGroup(group);
//     case 'OBSERVATION':
//       return this.buildObservationGroup(group);
//     default:
//       return '';
//   }
// }

// buildDataGroup(group) {
//   return `
//     <div class="row" style="margin-bottom: 15px;">
//       <div class="left">
//         <div class="info-title">
//           <span>Dados do veículo:</span>
//         </div>
//         <div class="info-item">
//           <span>Placa: ${this.data.inspectionVehicleData.data.licensePlate || 'NÃO INFORMADO'}</span>
//           <span>Chassi: ${this.data.inspectionVehicleData.data.chassis || 'NÃO INFORMADO'}</span>
//           <span>Motor: ${this.data.inspectionVehicleData.data.engineNumber || 'NÃO INFORMADO'}</span>
//           <span>Cor: ${this.data.inspectionVehicleData.data.color || 'NÃO INFORMADO'}</span>
//           <span>Combustivel: ${this.data.inspectionVehicleData.data.fuelType || 'NÃO INFORMADO'}</span>
//           <span>Câmbio: ${this.data.inspectionVehicleData.data.vehicleType || 'NÃO INFORMADO'}</span>
//           <span>KM: ${this.data.inspectionVehicleData.data.km || 'NÃO INFORMADO'}</span>
//           <span>GRV/Lote: ${this.data.inspectionVehicleData.data.grv || 'NÃO INFORMADO'}</span>

//         </div>
//       </div>
//       <div class="right">
//         <div class="info-title">
//           <span>Dados cadastrais:</span>
//         </div>
//         <div class="info-item">
//           <span>Placa: ${group.data.licensePlate || 'NÃO INFORMADO'}</span>
//           <span>Chassi: ${group.data.chassis || 'NÃO INFORMADO'}</span>
//           <span>Motor: ${group.data.engineNumber || 'NÃO INFORMADO'}</span>
//           <span>Cor: ${group.data.color || 'NÃO INFORMADO'}</span>
//           <span>Combustivel: ${this.data.fuelType || 'NÃO INFORMADO'}</span>
//           <span>Câmbio: ${group.data.vehicleType || 'NÃO INFORMADO'}</span>
//           <span>Ano: ${group.data.yearManufactureModel || 'NÃO INFORMADO'}</span>
//           <span>UF/Municipio: ${group.data.state ? group.data.state : 'NÃO INFORMADO'} / ${group.data.city ? group.data.city : 'NÃO INFORMADO'}</span>
//         </div>
//       </div>
//     </div>
//   `;
// }

// buildPartsGroup(group) {
//   const itemsFiltered = group.data.filter(item => !item.isPlaceholder);
//   return `
//   <div class="row photos">
//     ${itemsFiltered.map(part => `
//       <div class="item">
//         <div class="item-title" style="border-bottom: 5px solid ${part?.ratings.find(rating => rating.isSelected === true)?.color || ''};"><span>${part.name}</span></div>
//         <div class="item-image">
//           <img src="${part?.s3File?.url || ''}"/>
//         </div>
//       </div>
//     `).join('')}
//   </div>
// `;
// }

// buildRatings(items) {

//   const hasSelectedRatings = items.some(item =>
//     item.ratings.some(rating => rating.isSelected) ||
//     (item.type === 'EXTRA' && item.observation !== '')
//   );

//   if (!hasSelectedRatings) {
//     return '';
//   }

//   return `
//         <div class="row-rating">
//           ${items.map(item => {
//             //AQUI EU TO CHECANDO SE O ITEM É EXTRA PARA USAR O OBSERVATION AO INVÉS DOP RATINGS.
//             if (item.type === 'EXTRA') {
//               return `
//                 <div class="rating">
//                   <div class="rating-title" style="border-left: 16px solid gray;">
//                     <span>${item.name}</span>
//                   </div>
//                   <div class="rating-description">
//                     <span>${item.observation}</span>
//                   </div>
//                 </div>
//               `;
//             }

//             return item.ratings
//               ?.filter(rating => rating.isSelected)
//               .map(rating => `
//                 <div class="rating">
//                   <div class="rating-title" style="border-left: 16px solid ${rating.color};">
//                     <span>${item.name}</span>
//                   </div>
//                   <div class="rating-description">
//                     <span>${rating.name}</span>
//                   </div>
//                 </div>
//               `).join('');
//           }).join('')}
//         </div>
//       `;
// }

// buildObservationGroup(group) {
//   return `
//       <div class="observation">
//         <div class="second-info-title">
//           <span>Observações:</span>
//         </div>
//         <div class="second-item-note" style="text-transform: uppercase;">
//           <p>KM: ${group.data.km || 'Não informado'}</p>
//           <p>${group.data.textObservation || ''}</p>
//         </div>
//       </div>
//     `;
// }

// buildSignatureSection(notes, expert, analyst, unit) {
//   const defaultExpert = { name: 'Nome do Vistoriador', signature: null, cpf: 'N/A' };
//   const defaultAnalyst = { name: 'Nome do Analista', signature: null, cpf: 'N/A' };

//   expert = expert || defaultExpert;
//   analyst = analyst || defaultAnalyst;
//   return `
//     <div class="legal-info">
//      <div class="primary-info-title">
//           <span class>Importante:</span>
//       </div>
//       <div class="item-note">${notes || 'Este laudo trata-se da vistoria cautelar do veículo, possuindo caráter informativo da análise de itens, conforme padrões estabelecidos pelas fabricantes.'}</div>
//       <div class="footer-signature">
//       <div class="row">
//           <div class="left">
//             <div class="signature-field">
//               <div class="signature-image-container">
//                 ${expert.signature ? `
//                   <img
//                     src="${expert.signature}"
//                     alt="Assinatura do Perito"
//                     class="signature-image"
//                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
//                   />
//                 ` : `
//                   <div style="margin-top: 65px; color: #DC2626; text-align: center;">Assinatura não disponível</div>
//                 `}
//               </div>
//               <div class="signature-line"></div>
//               <p class="signature-text" style="text-transform: capitalize;">${expert.firstName ? expert.firstName : 'Não informado'} ${expert.lastName ? expert.lastName : ''}</p>
//               <p class="signature-text">CPF: ${expert.cpf ? expert.cpf : 'Não informado'}</p>
//               <p class="signature-position">Perito Automotivo</p>
//             </div>
//           </div>
//           <div class="right">
//             <div class="signature-field">
//               <div class="signature-image-container">
//                 ${analyst.signature ? `
//                   <img
//                     src="${analyst.signature}"
//                     alt="Assinatura do Analista"
//                     class="signature-image"
//                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
//                   />
//                 ` : `
//                   <div style="margin-top: 65px; color: #DC2626; text-align: center;">Assinatura não disponível</div>
//                 `}
//               </div>
//               <div class="signature-line"></div>
//               <p class="signature-text" style="text-transform: capitalize;">${analyst.firstName ? analyst.firstName : 'Não informado'} ${analyst.lastName ? analyst.lastName : ''}</p>
//               <p class="signature-text">CPF: ${analyst.cpf ? analyst.cpf : 'Não informado'}</p>
//               <p class="signature-position">Analista</p>
//             </div>
//           </div>

//       </div>

//         <div class="footer-infos">
//           ${unit.name ? `<span>Unidade: ${unit.name}</span>` : ''}
//           ${unit.phone || unit.email ? `<span>Telefone e e-mail: ${unit.phone || ''} ${unit.phone && unit.email ? '/' : ''} ${unit.email || ''}</span>` : ''}
//           ${unit.address ? `<span>Endereço: ${unit.address.street}, ${unit.address.city} - ${unit.address.state} |  CEP: ${unit.address.zipCode}</span>` : ''}
//           ${unit.cnpj ? `<span>CNPJ: ${unit.cnpj}</span>` : ''}
//         </div>
//       </div>
//     </div>
// `;
// }

// build() {
//   this.data.groups.sort((a, b) => a.printOrder - b.printOrder);

//   const partsGroups = this.data.groups.filter(group => group.groupType === 'PARTS');

//   partsGroups.forEach(group => {
//     group.data.sort((a, b) => a.printOrder - b.printOrder);
//   });

//   const dataGroupIndex = this.data.groups.findIndex(group => group.groupType === 'DATA');

//   if (dataGroupIndex !== -1) {
//     const [dataGroup] = this.data.groups.splice(dataGroupIndex, 1);

//     this.content += this.buildGroup(dataGroup);
//   }

//   const items = this.data.groups
//     .filter(group => group.groupType === 'PARTS')
//     .flatMap(group => group.data);

//   partsGroups[0].data.splice(0, 2);

//   this.data.groups.forEach(group => {
//     this.content += this.buildGroup(group);
//   });

//   this.content += this.buildRatings(items);

//   this.content += this.buildSignatureSection(this.data.notes, this.data.expert, this.data.analyst, this.data.unit);

//   if (this.data.expertSignature != null) {
//   }
//   this.content += '</body></html>';
//   return this.content;
// }

/**
 * Função para buscar um valor aninhado dentro de um objeto a partir de uma string de caminho.
 * Exemplo: getNestedValue(obj, "inspectionVehicleData.data.licensePlate")
 */

function vehicleDetailComparisonComponent(data, content) {
  const vehicleData = data.groups.find((group) => group.groupType === "DATA").data;
  const factoryData = data.inspectionVehicleData.data;

  const $ = cheerio.load(content);

  $(".grid.grid-cols-3").each((_, element) => {
    const label = $(element).find("div:first-child").text().trim();
    const cells = $(element).find("div:nth-child(n+2)");

    let key;

    if (label.includes("PLACA")) key = "licensePlate";
    if (label.includes("MARCA/MODELO")) key = "brandModel";
    if (label.includes("COR")) key = "color";
    if (label.includes("COMBUSTÍVEL")) key = "fuelType";
    if (label.includes("ANO")) key = "yearManufactureModel";
    if (label.includes("GRAV. DO CHASSI")) key = "chassis";
    if (label.includes("GRAVAÇÃO DO MOTOR")) key = "engineNumber";
    if (label.includes("KM")) key = "km";

    if (key) {
      const formattedFactoryData = factoryData[key] || "NÃO INFORMADO";
      const formattedVehicleData = vehicleData[key] || "NÃO INFORMADO";

      $(cells[1]).text(formattedFactoryData);

      if (formattedVehicleData !== formattedFactoryData) {
        $(cells[0]).text(formattedVehicleData).addClass("text-red-600 underline font-bold");
      } else {
        $(cells[0]).text(formattedVehicleData).removeClass("text-red-600 underline font-bold");
      }
    }
  });

  return $.html();
}

function VehicleGrid4Component(data, content) {
  const partsData = data.groups.find((group) => group.groupType === "PARTS").data.filter((item) => !item.isPlaceholder);

  const $ = cheerio.load(content);

  $(".grid.grid-cols-2").each((_, element) => {
    const items = $(element).find(".flex.flex-col.w-full.rounded-2xl.overflow-hidden.bg-gray-100.shadow-md");

    items.each((index, item) => {
      const img = $(item).find("img");
      const part = partsData[index];

      console.log(part);

      // const imgSrc = part?.s3File?.url || "https://i.imgur.com/fl0uV88.png";
      const imgSrc = "https://i.imgur.com/fl0uV88.png";
      img.attr("src", imgSrc);
    });
  });

  return $.html();
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), obj);
}

async function Layout2Builder(data) {
  const fileId = uuidv4();
  const tempFilePath = path.join(TEMP_DIR, `index-${fileId}.html`);

  try {
    let content = fs.readFileSync(path.join(__dirname, "../../../client2/dist/index.html"), "utf8");

    content = content.replace(/{([\w.]+)}/g, (match, path) => {
      if (path === "clientName") return getClientName(data.client);
      return getNestedValue(data, path) || "";
    });

    content = vehicleDetailComparisonComponent(data, content);
    content = VehicleGrid4Component(data, content);

    fs.writeFileSync(tempFilePath, content, "utf8");

    return tempFilePath;
  } catch (error) {
    console.error("Erro ao gerar HTML personalizado:", error.message);
    throw new Error("Falha ao gerar HTML personalizado.");
  }
}

module.exports = { Layout2Builder };
