const { generateImage } = require('./imageGenerator');
const fs = require('fs/promises');
const path = require('path');

module.exports = {
  createCroquiImage: async (requestBody, savePath) => {
    const { vehicleType, groups, config } = convertBodyToCroquiData(requestBody);

    if (!vehicleType && !config) {
      throw new Error('Você deve fornecer imageType ou config');
    }

    try {
      // Cria o diretório base, se necessário
      if (savePath) {
        await fs.mkdir(savePath, { recursive: true });
      }

      // Processa todos os grupos em paralelo
      await Promise.all(groups.map(async (gp) => {
        const imageBuffer = await generateImage(vehicleType, gp.croquiType, gp.items);

        if (savePath) {
          const baseName = `${gp.id}`;
          const imagePath = path.join(savePath, `${baseName}.png`);
          const jsonPath = path.join(savePath, `${baseName}.json`);

          // Salva imagem
          await fs.writeFile(imagePath, imageBuffer);
          console.log(`Imagem salva em: ${imagePath}`);

          // Salva JSON
          const croquiJson = {
            vehicleType: `${vehicleType} - ${gp.croquiType}`,
            items: gp.items,
            config,
          };

          await fs.writeFile(jsonPath, JSON.stringify(croquiJson, null, 2));
          console.log(`JSON salvo em: ${jsonPath}`);
        }
      }));
    } catch (error) {
      console.error("Erro ao gerar ou salvar a imagem/JSON:", error);
      throw new Error('Erro ao criar a imagem');
    }
  }
}

function convertBodyToCroquiData(requestBody) {
  const groups = [];
  requestBody.groups
    .filter(group => group.groupType === "CROQUI" && group.data?.items?.length > 0)
    .forEach(group => {
      console.log(group);
      const groupItems = {};
      group.data.items.forEach(item => {
        const selectedRating = item.ratings.find(rating => rating.isSelected);
        if (selectedRating) {
          groupItems[item.croquiId] = {
            status: selectedRating.name,
            name: item.name,
            color: selectedRating.color
          };
        }
      });

      const groupFormatted = {
        id: group.id,
        name: group.name,
        croquiType: group.data.croquiType,
        isPdfEnabled: group.isPdfEnabled,
        items: groupItems
      };

      groups.push(groupFormatted);
    });

  return {
    vehicleType: requestBody.vehicleType,
    groups,
    config: requestBody.config
  };
}
