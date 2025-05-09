import express from 'express';
import { generateImage } from './src/imageGenerator.js';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '100mb' }));


app.post('/generate-image', async (req, res) => {
  try {
    const { vehicleType, croquiType, items } = req.body;
    
    if (!vehicleType && !config) {
      return res.status(400).json({ 
        error: 'Você deve fornecer imageType ou config',
        message: 'Envie o tipo de imagem (imageType) ou uma configuração personalizada (config)'
      });
    }
    
    if (!items) {
      return res.status(400).json({ 
        error: 'Elementos são obrigatórios',
        message: 'Você deve fornecer os elementos a serem desenhados'
      });
    }
    
    // Gerar a imagem com base nos parâmetros
    const imageBuffer = await generateImage(vehicleType, croquiType,items);
    
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
    res.status(500).json({ error: 'Erro ao gerar imagem', details: error.message });
  }
});



// Inicializar e iniciar o servidor
(async () => {
  try {
    // Criar diretório de imagens
    await fs.mkdir('./images', { recursive: true });
    
    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar o servidor:', error);
  }
})();