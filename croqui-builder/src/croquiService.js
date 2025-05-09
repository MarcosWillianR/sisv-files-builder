import { generateImage } from './imageGenerator.js';
import fs from 'fs/promises';
import path from 'path';

export async function createCroquiImage(requestBody, savePath) {
  const { vehicleType, items, config } = convertBodyToCroquiData(requestBody);

  if (!vehicleType && !config) {
    throw new Error('Você deve fornecer imageType ou config');
  }

  if (!items) {
    throw new Error('Você deve fornecer os elementos a serem desenhados');
  }

  try {
    const imageBuffer = await generateImage(vehicleType, items, config);

    if (savePath) {
      console.log("Entrando no path para salvar a imagem");
      console.log('Caminho de salvamento:', savePath);

      const dir = path.dirname(savePath);
      await fs.mkdir(dir, { recursive: true });

      // Salva a imagem
      await fs.writeFile(savePath, imageBuffer);
      console.log(`Imagem salva em: ${savePath}`);

      // Salva o JSON
      const jsonPath = savePath.replace(path.extname(savePath), '.json');
      const croquiJson = {
        vehicleType,
        items,
        config,
      };
      await fs.writeFile(jsonPath, JSON.stringify(croquiJson, null, 2));
      console.log(`JSON salvo em: ${jsonPath}`);
    }

    return imageBuffer;
  } catch (error) {
    console.error("Erro ao gerar ou salvar a imagem/JSON:", error);
    throw new Error('Erro ao criar a imagem');
  }
}


function convertBodyToCroquiData(requestBody) {
  const items = {};

  requestBody.groups
    .filter(group => group.groupType === "CROQUI" && group.data?.items?.length > 0)
    .flatMap(group => group.data.items)
    .forEach(item => {
      const selectedRating = item.ratings.find(rating => rating.isSelected);
      if (selectedRating) {
        items[item.croquiId] = {
          status: selectedRating.name,
          name: item.name,
          color: selectedRating.color
        };
      }
    });

  return {
    vehicleType: requestBody.vehicleType,
    items,
    config: requestBody.config
  };
}
