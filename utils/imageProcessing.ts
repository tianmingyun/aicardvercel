import { createCanvas, loadImage, registerFont } from 'canvas'
import path from 'path'
import fs from 'fs'

export async function generateImage(prompt: string): Promise<string> {
  try {
    // Simulate AI image generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    const placeholderPath = path.join(process.cwd(), 'public', 'placeholder.jpg')
    
    if (!fs.existsSync(placeholderPath)) {
      throw new Error('Placeholder image not found')
    }
    
    return placeholderPath
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}

export async function addTextToImage(imagePath: string, text: string): Promise<string> {
  try {
    const image = await loadImage(imagePath)
    const canvas = createCanvas(image.width, image.height)
    const ctx = canvas.getContext('2d')

    // Draw the base image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    // Configure text style
    ctx.font = '32px "Noto Sans SC"'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Add text to the image
    ctx.fillText(text, canvas.width / 2, canvas.height - 50)

    // Ensure the output directory exists
    const outputDir = path.join(process.cwd(), 'public', 'generated')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Save the image
    const outputFileName = `card_${Date.now()}.png`
    const outputPath = path.join(outputDir, outputFileName)
    const out = fs.createWriteStream(outputPath)
    const stream = canvas.createPNGStream()
    stream.pipe(out)

    return new Promise((resolve, reject) => {
      out.on('finish', () => resolve(outputPath))
      out.on('error', reject)
    })
  } catch (error) {
    console.error('Error adding text to image:', error)
    throw error
  }
}