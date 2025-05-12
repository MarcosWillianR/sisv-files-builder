const { createCanvas, loadImage } = require('canvas')
const { fileURLToPath } = require("url")
const fs = require("fs/promises")
const path = require("path")

// Definir cores para os diferentes status
const statusColors = {
  pintura_original: "#4CAF50",
  repintura_total: "#FFC107",
  repintura_parcial: "#FF9800",
  substituicao: "#2196F3",
  fora_do_padrao: "#F44336",
  padroes_do_fabricante: "#4CAF50",
  adulterado: "#F44336",
}

module.exports = {
  generateImage: async (vehicleType, croquiType, items) => {
    const config = await getConfigs(vehicleType, croquiType)

    // Definir tamanhos padrão para os cards, se não estiverem na configuração
    const defaultCardHeight = 80
    const defaultHeaderHeight = 40 // Altura padrão do cabeçalho
    const maxCardWidth = 350 // Largura máxima do card

    // Obter tamanhos dos cards da configuração, ou usar os padrões
    const cardHeight = config.cardHeight || defaultCardHeight
    const headerHeight = config.headerHeight || defaultHeaderHeight

    // Definir propriedades de texto padrão
    const defaultTextConfig = {
      headerFontSize: 12,
      headerFontStyle: "bold",
      headerTextColor: "#FFFFFF",
      headerTextAlign: "center",

      nameFontSize: 11,
      nameFontStyle: "bold",
      nameTextColor: "#333333",
      nameTextAlign: "center", // Garantir que o alinhamento padrão seja centralizado

      fontFamily: "Arial",
    }

    // Mesclar configurações de texto padrão com as da configuração global
    const textConfig = {
      ...defaultTextConfig,
      ...(config.textConfig || {}),
    }

    const canvas = createCanvas(config.width, config.height)
    const ctx = canvas.getContext("2d")

    // Desenhar fundo branco
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, config.width, config.height)

    try {
      // Carregar a imagem base
      const filename = fileURLToPath(require('url').pathToFileURL(__filename).toString())
      const __dirname = path.dirname(filename)

      const baseImage = await loadImage(path.resolve(__dirname, `${config.imagePath}`))

      console.log("Imagem carregada com sucesso")

      // Desenhar a imagem em tamanho original, centralizada
      const x = (config.width - baseImage.width) / 2
      const y = (config.height - baseImage.height) / 2

      // Se a imagem for maior que o canvas, ajustar para caber
      if (baseImage.width > config.width || baseImage.height > config.height) {
        const scale = Math.min(config.width / baseImage.width, config.height / baseImage.height)

        const newWidth = baseImage.width * scale
        const newHeight = baseImage.height * scale

        const newX = (config.width - newWidth) / 2
        const newY = (config.height - newHeight) / 2

        console.log("Redimensionando imagem para caber no canvas")
        ctx.drawImage(baseImage, newX, newY, newWidth, newHeight)
      } else {
        // Desenhar em tamanho original se couber
        console.log("Desenhando imagem em tamanho original em:", x, y)
        ctx.drawImage(baseImage, x, y)
      }
    } catch (error) {
      console.error("Erro ao carregar imagem:", error)
      console.log("Usando contorno simples")

      // Desenhar um contorno simples
      ctx.strokeStyle = "#333333"
      ctx.lineWidth = 1

      const centerX = config.width / 2
      const centerY = config.height / 2
      const carWidth = config.width * 0.6
      const carHeight = config.height * 0.4

      ctx.beginPath()
      ctx.ellipse(centerX, centerY, carWidth / 2, carHeight / 2, 0, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Processar cada elemento do body
    console.log("Processando elementos...")

    
    for (const [positionId, elementData] of Object.entries(items)) {
      const position = config.positions[elementData.croquiId]
      
      if (!position) {
        // console.warn(`Posição ID ${positionId} não encontrada na configuração`)
        continue
      }

      const selectedData = { color: "#CCCCCC", name: "pintura_original" }
      const selectedRating = elementData.ratings.find(r => r.isSelected);
      if (selectedRating) {
        selectedData.color = selectedRating.color;
        selectedData.name = selectedRating.name;
      }
      

      // Obter os dados do elemento enviado no body
      const status = selectedData.name;
      // console.log(`Status para posição ${positionId}:`, status)

      // Usar a cor do body se fornecida, caso contrário usar a cor do status
      const color = selectedData.color;
      // console.log(`Cor para posição ${positionId}:`, color)

      // Usar o nome do body se fornecido, caso contrário usar o nome do config
      const name = elementData.name || (position.to ? position.to.name : position.name)
      // console.log(`Nome para posição ${positionId}:`, name)

      // Mesclar configurações de texto em ordem de prioridade
      const positionTextConfig = position.textConfig || (position.to && position.to.textConfig) || {}
      const elementTextConfig = elementData.textConfig || {}

      const mergedTextConfig = {
        ...textConfig,
        ...positionTextConfig,
        ...elementTextConfig,
      }

      // Forçar alinhamento centralizado para o texto do nome
      mergedTextConfig.nameTextAlign = "center"

      // Obter a altura do cabeçalho em ordem de prioridade
      const actualHeaderHeight =
        elementData.headerHeight || (position.to && position.to.headerHeight) || position.headerHeight || headerHeight

      // Verificar se temos a estrutura com from e to
      if (position.from && position.to) {
        // PASSO 1: Configurar a fonte para calcular a largura do texto
        ctx.font = `${mergedTextConfig.nameFontStyle} ${mergedTextConfig.nameFontSize}px ${mergedTextConfig.fontFamily}`

        // Calcular a largura do texto do nome
        const nameMetrics = ctx.measureText(name)
        const nameWidth = nameMetrics.width

        // Calcular a largura do texto do cabeçalho
        ctx.font = `${mergedTextConfig.headerFontStyle} ${mergedTextConfig.headerFontSize}px ${mergedTextConfig.fontFamily}`
        const headerText = status.toUpperCase().replace(/_/g, " ")
        const headerMetrics = ctx.measureText(headerText)
        const headerWidth = headerMetrics.width

        // Usar a maior largura entre o texto do nome e do cabeçalho
        const textWidth = Math.max(nameWidth, headerWidth)

        // Adicionar padding para o texto
        const padding = 40 // 20px de cada lado

        // Calcular a largura do card baseada no texto, mas limitada ao máximo
        const actualCardWidth = Math.min(maxCardWidth, textWidth + padding)

        // Verificar se precisamos quebrar o texto em linhas
        const maxTextWidth = actualCardWidth - padding

        // Configurar a fonte para o nome novamente
        ctx.font = `${mergedTextConfig.nameFontStyle} ${mergedTextConfig.nameFontSize}px ${mergedTextConfig.fontFamily}`

        // Quebrar o texto do nome em linhas
        const nameLines = calculateTextLines(ctx, name, maxTextWidth)

        // Quebrar o texto do cabeçalho em linhas se necessário
        ctx.font = `${mergedTextConfig.headerFontStyle} ${mergedTextConfig.headerFontSize}px ${mergedTextConfig.fontFamily}`
        const headerLines = calculateTextLines(ctx, headerText, maxTextWidth)

        //console.log(`Texto "${name}" quebrado em ${nameLines.length} linhas`)
        //console.log(`Cabeçalho "${headerText}" quebrado em ${headerLines.length} linhas`)
        //console.log(`Largura do texto: ${textWidth}px, Largura do card: ${actualCardWidth}px`)

        // PASSO 2: Usar as coordenadas do to para posicionar o card
        const toX = position.to.x
        const toY = position.to.y

        // Calcular a altura do card com base no número de linhas
        const lineHeight = mergedTextConfig.nameFontSize * 1.3
        const headerLineHeight = mergedTextConfig.headerFontSize * 1.3

        // Altura do cabeçalho baseada no número de linhas
        const headerTextHeight = headerLines.length * headerLineHeight
        const actualHeaderTextHeight = Math.max(actualHeaderHeight, headerTextHeight + 10)

        // Altura do texto do nome
        const nameTextHeight = nameLines.length * lineHeight

        // Altura total do card
        const actualCardHeight = actualHeaderTextHeight + nameTextHeight + 20

        // Calcular o ponto central do card para a linha
        const cardCenterX = toX + actualCardWidth / 2
        const cardCenterY = toY

        // Desenhar linha do ponto from até o card
        const fromX = position.from.x + position.from.width / 2
        const fromY = position.from.y

        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(cardCenterX, cardCenterY)
        ctx.strokeStyle = "#555555"
        ctx.lineWidth = 3
        ctx.stroke()

        // Desenhar um pequeno círculo no ponto de início
        ctx.beginPath()
        ctx.arc(fromX, fromY, 5, 0, 3 * Math.PI)
        ctx.fillStyle = color
        ctx.fill()
        ctx.strokeStyle = "#333333"
        ctx.lineWidth = 0.5
        ctx.stroke()

        // Desenhar o card
        // Adicionar sombra ao card
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
        ctx.shadowBlur = 5
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2

        // Desenhar o fundo do card (branco)
        ctx.fillStyle = "#FFFFFF"
        ctx.globalAlpha = 1.0
        roundRect(ctx, toX, toY, actualCardWidth, actualCardHeight, 4, true, false)

        // Remover sombra para o resto dos elementos
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0

        // Desenhar o cabeçalho colorido
        ctx.fillStyle = color
        roundRect(ctx, toX, toY, actualCardWidth, actualHeaderTextHeight, 4, true, false, true)

        // Desenhar borda do card
        ctx.strokeStyle = "#DDDDDD"
        ctx.lineWidth = 1
        roundRect(ctx, toX, toY, actualCardWidth, actualCardHeight, 4, false, true)

        // Adicionar texto do status no cabeçalho
        ctx.fillStyle = mergedTextConfig.headerTextColor
        ctx.font = `${mergedTextConfig.headerFontStyle} ${mergedTextConfig.headerFontSize}px ${mergedTextConfig.fontFamily}`
        ctx.textAlign = mergedTextConfig.headerTextAlign

        // Desenhar cada linha do texto do cabeçalho
        let headerTextY = toY + 10 + mergedTextConfig.headerFontSize

        for (const line of headerLines) {
          const headerTextX = toX + actualCardWidth / 2

          // Adicionar borda fina ao texto do cabeçalho (ou remover completamente)
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = 0.1 // Reduzir para 0.5 ou remover esta linha e a próxima para eliminar o contorno
          ctx.strokeText(line, headerTextX, headerTextY)
          ctx.fillText(line, headerTextX, headerTextY)

          // Incrementar Y para a próxima linha
          headerTextY += headerLineHeight
        }

        // Adicionar nome da parte
        ctx.fillStyle = mergedTextConfig.nameTextColor
        ctx.font = `${mergedTextConfig.nameFontStyle} ${mergedTextConfig.nameFontSize}px ${mergedTextConfig.fontFamily}`
        ctx.textAlign = "center" // Forçar alinhamento centralizado

        // Calcular posição inicial Y para o texto do nome
        let nameTextY = toY + actualHeaderTextHeight + mergedTextConfig.nameFontSize + 10

        // Desenhar cada linha do texto do nome
        for (const line of nameLines) {
          // Calcular posição X centralizada
          const nameTextX = toX + actualCardWidth / 2

          // Adicionar borda fina ao texto do nome (ou remover completamente)
          ctx.strokeStyle = "#000000"
          ctx.fillText(line, nameTextX, nameTextY)

          // Incrementar Y para a próxima linha
          nameTextY += lineHeight
        }
      } else {
        // Formato antigo (sem from/to)
        const cardX = position.x
        const cardY = position.y

        // PASSO 1: Configurar a fonte para calcular a largura do texto
        ctx.font = `${mergedTextConfig.nameFontStyle} ${mergedTextConfig.nameFontSize}px ${mergedTextConfig.fontFamily}`

        // Calcular a largura do texto do nome
        const nameMetrics = ctx.measureText(name)
        const nameWidth = nameMetrics.width

        // Calcular a largura do texto do cabeçalho
        ctx.font = `${mergedTextConfig.headerFontStyle} ${mergedTextConfig.headerFontSize}px ${mergedTextConfig.fontFamily}`
        const headerText = status.toUpperCase().replace(/_/g, " ")
        const headerMetrics = ctx.measureText(headerText)
        const headerWidth = headerMetrics.width

        // Usar a maior largura entre o texto do nome e do cabeçalho
        const textWidth = Math.max(nameWidth, headerWidth)

        // Adicionar padding para o texto
        const padding = 40 // 20px de cada lado

        // Calcular a largura do card baseada no texto, mas limitada ao máximo
        const actualCardWidth = Math.min(maxCardWidth, textWidth + padding)

        // Verificar se precisamos quebrar o texto em linhas
        const maxTextWidth = actualCardWidth - padding

        // Configurar a fonte para o nome novamente
        ctx.font = `${mergedTextConfig.nameFontStyle} ${mergedTextConfig.nameFontSize}px ${mergedTextConfig.fontFamily}`

        // Quebrar o texto do nome em linhas
        const nameLines = calculateTextLines(ctx, name, maxTextWidth)

        // Quebrar o texto do cabeçalho em linhas se necessário
        ctx.font = `${mergedTextConfig.headerFontStyle} ${mergedTextConfig.headerFontSize}px ${mergedTextConfig.fontFamily}`
        const headerLines = calculateTextLines(ctx, headerText, maxTextWidth)

        console.log(`Texto "${name}" quebrado em ${nameLines.length} linhas`)
        console.log(`Cabeçalho "${headerText}" quebrado em ${headerLines.length} linhas`)
        console.log(`Largura do texto: ${textWidth}px, Largura do card: ${actualCardWidth}px`)

        // Calcular a altura do card com base no número de linhas
        const lineHeight = mergedTextConfig.nameFontSize * 1.3
        const headerLineHeight = mergedTextConfig.headerFontSize * 1.3

        // Altura do cabeçalho baseada no número de linhas
        const headerTextHeight = headerLines.length * headerLineHeight
        const actualHeaderTextHeight = Math.max(actualHeaderHeight, headerTextHeight + 10)

        // Altura do texto do nome
        const nameTextHeight = nameLines.length * lineHeight

        // Altura total do card
        const actualCardHeight = actualHeaderTextHeight + nameTextHeight + 20

        // Desenhar o card
        // Adicionar sombra ao card
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
        ctx.shadowBlur = 5
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2

        // Desenhar o fundo do card (branco)
        ctx.fillStyle = "#FFFFFF"
        ctx.globalAlpha = 1.0
        roundRect(ctx, cardX, cardY, actualCardWidth, actualCardHeight, 4, true, false)

        // Remover sombra para o resto dos elementos
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0

        // Desenhar o cabeçalho colorido
        ctx.fillStyle = color
        roundRect(ctx, cardX, cardY, actualCardWidth, actualHeaderTextHeight, 4, true, false, true)

        // Desenhar borda do card
        ctx.strokeStyle = "#DDDDDD"
        ctx.lineWidth = 1
        roundRect(ctx, cardX, cardY, actualCardWidth, actualCardHeight, 4, false, true)

        // Adicionar texto do status no cabeçalho
        ctx.fillStyle = mergedTextConfig.headerTextColor
        ctx.font = `${mergedTextConfig.headerFontStyle} ${mergedTextConfig.headerFontSize}px ${mergedTextConfig.fontFamily}`
        ctx.textAlign = mergedTextConfig.headerTextAlign

        // Desenhar cada linha do texto do cabeçalho
        let headerTextY = cardY + 10 + mergedTextConfig.headerFontSize

        for (const line of headerLines) {
          const headerTextX = cardX + actualCardWidth / 2

          // Adicionar borda fina ao texto do cabeçalho (ou remover completamente)
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = 0.5 // Reduzir para 0.5 ou remover esta linha e a próxima para eliminar o contorno
          ctx.strokeText(line, headerTextX, headerTextY)
          ctx.fillText(line, headerTextX, headerTextY)

          // Incrementar Y para a próxima linha
          headerTextY += headerLineHeight
        }

        // Adicionar nome da parte
        ctx.fillStyle = mergedTextConfig.nameTextColor
        ctx.font = `${mergedTextConfig.nameFontStyle} ${mergedTextConfig.nameFontSize}px ${mergedTextConfig.fontFamily}`
        ctx.textAlign = "center" // Forçar alinhamento centralizado

        // Calcular posição inicial Y para o texto do nome
        let nameTextY = cardY + actualHeaderTextHeight + mergedTextConfig.nameFontSize + 10

        // Desenhar cada linha do texto do nome
        for (const line of nameLines) {
          // Calcular posição X centralizada
          const nameTextX = cardX + actualCardWidth / 2

          // Adicionar borda fina ao texto do nome (ou remover completamente)
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = 0.5 // Reduzir para 0.5 ou remover esta linha e a próxima para eliminar o contorno
          ctx.strokeText(line, nameTextX, nameTextY)
          ctx.fillText(line, nameTextX, nameTextY)

          // Incrementar Y para a próxima linha
          nameTextY += lineHeight
        }
      }
    }

    console.log("Imagem gerada com sucesso")
    return canvas.toBuffer("image/png")
  }
}

async function getConfigs(vehicleType, croquiType) {
  const filename = fileURLToPath(require('url').pathToFileURL(__filename).toString());
  const __dirname = path.dirname(filename);

  const configFilePath = path.join(__dirname, "..", "config.json");
  const rawData = await fs.readFile(configFilePath, "utf-8");
  const allConfigs = JSON.parse(rawData);

  const config = allConfigs[`${vehicleType} - ${croquiType}`];

  if (!config) {
    throw new Error(`Config not found for vehicle type: ${vehicleType} - ${croquiType}`);
  }

  return config;
}


// Função para quebrar texto em múltiplas linhas
function calculateTextLines(ctx, text, maxWidth) {
  // Se o texto for vazio, retornar um array vazio
  if (!text || text.trim() === "") {
    return [""]
  }

  const words = text.split(" ")
  const lines = []
  let currentLine = ""

  // Se o texto tiver apenas uma palavra
  if (words.length === 1) {
    const word = words[0]
    // Verificar se a palavra é muito longa para a largura máxima
    if (ctx.measureText(word).width > maxWidth) {
      // Quebrar a palavra em caracteres
      let currentPart = ""
      for (const char of word) {
        const testPart = currentPart + char
        if (ctx.measureText(testPart).width > maxWidth) {
          lines.push(currentPart)
          currentPart = char
        } else {
          currentPart = testPart
        }
      }
      if (currentPart) {
        lines.push(currentPart)
      }
      return lines
    } else {
      // A palavra cabe na largura máxima
      return [word]
    }
  }

  // Processar múltiplas palavras
  for (const word of words) {
    const testLine = currentLine + (currentLine ? " " : "") + word
    const testWidth = ctx.measureText(testLine).width

    if (testWidth > maxWidth && currentLine !== "") {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

// Função para desenhar retângulos com bordas arredondadas
function roundRect(ctx, x, y, width, height, radius, fill, stroke, onlyTop = false) {
  if (width < 2 * radius) radius = width / 2
  if (height < 2 * radius) radius = height / 2

  ctx.beginPath()

  // Canto superior esquerdo
  ctx.moveTo(x + radius, y)

  // Borda superior
  ctx.lineTo(x + width - radius, y)

  // Canto superior direito
  ctx.arcTo(x + width, y, x + width, y + radius, radius)

  if (!onlyTop) {
    // Borda direita
    ctx.lineTo(x + width, y + height - radius)

    // Canto inferior direito
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius)

    // Borda inferior
    ctx.lineTo(x + radius, y + height)

    // Canto inferior esquerdo
    ctx.arcTo(x, y + height, x, y + height - radius, radius)

    // Borda esquerda
    ctx.lineTo(x, y + radius)
  } else {
    // Se onlyTop for true, desenhar apenas a parte superior arredondada
    // e completar o retângulo com linhas retas
    ctx.lineTo(x + width, y + height)
    ctx.lineTo(x, y + height)
  }

  // Canto superior esquerdo
  ctx.arcTo(x, y, x + radius, y, radius)

  ctx.closePath()

  if (fill) {
    ctx.fill()
  }

  if (stroke) {
    ctx.stroke()
  }
}
