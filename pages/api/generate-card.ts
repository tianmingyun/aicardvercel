import type { NextApiRequest, NextApiResponse } from 'next'
import { generateImage, addTextToImage } from '../../utils/imageProcessing'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { wishes } = req.body

  if (!wishes) {
    return res.status(400).json({ message: 'Wishes are required' })
  }

  try {
    console.log('Received wishes:', wishes)

    // Generate base image using AI model (currently using placeholder)
    const baseImagePath = await generateImage(wishes)
    if (!baseImagePath) {
      throw new Error('Failed to generate base image')
    }
    console.log('Base image generated:', baseImagePath)

    // Add text to the image
    const finalImagePath = await addTextToImage(baseImagePath, wishes)
    if (!finalImagePath) {
      throw new Error('Failed to add text to image')
    }
    console.log('Final image generated:', finalImagePath)

    // Get the filename from the path
    const filename = path.basename(finalImagePath)
    const imageUrl = `/generated/${filename}`
    console.log('Image URL:', imageUrl)

    res.status(200).json({ imageUrl })
  } catch (error) {
    console.error('Error generating card:', error)
    res.status(500).json({ message: `Failed to generate card: ${error.message}` })
  }
}