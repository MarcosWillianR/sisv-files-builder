// Desenhar um contorno mais detalhado de carro
export function drawCarOutline(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const carWidth = width * 0.6;
  const carHeight = height * 0.4;
  
  // Salvar o estado atual do contexto
  ctx.save();
  
  // Configurar estilo para o contorno
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Desenhar o contorno principal do carro (corpo)
  ctx.beginPath();
  
  // Parte superior (teto)
  const roofWidth = carWidth * 0.6;
  const roofHeight = carHeight * 0.6;
  ctx.ellipse(centerX, centerY, roofWidth / 2, roofHeight / 2, 0, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Parte inferior (corpo principal)
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, carWidth / 2, carHeight / 2, 0, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Linhas internas para mostrar as divisões
  
  // Linha central (divisão esquerda/direita)
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - carHeight / 2 - 10);
  ctx.lineTo(centerX, centerY + carHeight / 2 + 10);
  ctx.stroke();
  
  // Linhas para portas e outras divisões
  // Frente
  ctx.beginPath();
  ctx.moveTo(centerX - carWidth / 4, centerY - carHeight / 2);
  ctx.lineTo(centerX - carWidth / 4, centerY + carHeight / 2);
  ctx.stroke();
  
  // Traseira
  ctx.beginPath();
  ctx.moveTo(centerX + carWidth / 4, centerY - carHeight / 2);
  ctx.lineTo(centerX + carWidth / 4, centerY + carHeight / 2);
  ctx.stroke();
  
  // Detalhes adicionais
  
  // Rodas
  const wheelRadius = carHeight * 0.15;
  const wheelOffsetX = carWidth * 0.35;
  const wheelOffsetY = carHeight * 0.4;
  
  // Roda frontal esquerda
  ctx.beginPath();
  ctx.ellipse(centerX - wheelOffsetX, centerY - wheelOffsetY, wheelRadius, wheelRadius, 0, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Roda frontal direita
  ctx.beginPath();
  ctx.ellipse(centerX - wheelOffsetX, centerY + wheelOffsetY, wheelRadius, wheelRadius, 0, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Roda traseira esquerda
  ctx.beginPath();
  ctx.ellipse(centerX + wheelOffsetX, centerY - wheelOffsetY, wheelRadius, wheelRadius, 0, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Roda traseira direita
  ctx.beginPath();
  ctx.ellipse(centerX + wheelOffsetX, centerY + wheelOffsetY, wheelRadius, wheelRadius, 0, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Restaurar o estado do contexto
  ctx.restore();
}

// Função para desenhar texto
export function drawText(ctx, text, x, y) {
  // Salvar estado atual
  ctx.save();
  
  // Configurar estilo para texto com melhor legibilidade
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 12px Arial';
  
  // Adicionar sombra para melhor legibilidade
  ctx.shadowColor = '#FFFFFF';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // Desenhar o texto
  ctx.fillText(text, x, y);
  
  // Restaurar estado
  ctx.restore();
}

// Função para desenhar texto com quebra de linha
export function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  // Salvar estado atual
  ctx.save();
  
  // Configurar estilo para texto
  ctx.fillStyle = '#000000';
  ctx.font = '12px Arial';
  
  // Adicionar sombra para melhor legibilidade
  ctx.shadowColor = '#FFFFFF';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  const words = text.split(' ');
  let line = '';
  let testLine = '';
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y + (lineCount * lineHeight));
      line = words[n] + ' ';
      lineCount++;
    } else {
      line = testLine;
    }
  }
  
  ctx.fillText(line, x, y + (lineCount * lineHeight));
  
  // Restaurar estado
  ctx.restore();
  
  return lineCount + 1;
}