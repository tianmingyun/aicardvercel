import type { NextApiRequest, NextApiResponse } from 'next'
import { generateImage, addTextToImage } from '../../utils/imageProcessing'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { wishes } = req.body

  if (!wishes) {
    return res.status(400).json({ message: 'Wishes are required' })
  }

  try {
    // Generate base image using AI model
    const baseImagePath = await generateImage(wishes)
    if (!baseImagePath) {
      throw new Error('Failed to generate base image')
    }

    // Add text to the image
    const finalImagePath = await addTextToImage(baseImagePath, wishes)
    if (!finalImagePath) {
      throw new Error('Failed to add text to image')
    }

    // In a real-world scenario, you'd upload this image to a storage service
    // and return the URL. For this example, we'll assume it's served from the public directory.
    const imageUrl = `/generated/${finalImagePath.split('/').pop()}`

    res.status(200).json({ imageUrl })
  } catch (error) {
    console.error('Error generating card:', error)
    res.status(500).json({ message: `Failed to generate card: ${error.message}` })
  }
}