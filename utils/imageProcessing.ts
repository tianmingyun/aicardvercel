import { createCanvas, loadImage, registerFont } from 'canvas'
import path from 'path'
import fs from 'fs'
import { generateImageWithXfyun } from './xfyunApi'

export async function generateImage(prompt: string): Promise<string> {
  try {
    console.log('Generating image for prompt:', prompt)
    const imageUrl = await generateImageWithXfyun(prompt)
    console.log('Image generated:', imageUrl)
    return imageUrl
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}

export async function addTextToImage(imageUrl: string, text: string): Promise<string> {
  try {
    console.log('Adding text to image:', imageUrl, text)
    const image = await loadImage(imageUrl)
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
      console.log('Creating output directory:', outputDir)
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Save the image
    const outputFileName = `card_${Date.now()}.png`
    const outputPath = path.join(outputDir, outputFileName)
    const out = fs.createWriteStream(outputPath)
    const stream = canvas.createPNGStream()
    stream.pipe(out)

    return new Promise((resolve, reject) => {
      out.on('finish', () => {
        console.log('Image saved:', outputPath)
        resolve(`/generated/${outputFileName}`)
      })
      out.on('error', (err) => {
        console.error('Error saving image:', err)
        reject(err)
      })
    })
  } catch (error) {
    console.error('Error adding text to image:', error)
    throw error
  }
}