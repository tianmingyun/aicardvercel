import type { NextApiRequest, NextApiResponse } from 'next'
import { generateImage, addTextToImage } from '../../utils/imageProcessing'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API route called')
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method)
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { wishes } = req.body
  console.log('Received wishes:', wishes)

  if (!wishes) {
    return res.status(400).json({ message: 'Wishes are required' })
  }

  try {
    console.log('Generating base image...')
    const baseImageUrl = await generateImage(wishes)
    console.log('Base image generated:', baseImageUrl)

    console.log('Adding text to image...')
    const finalImagePath = await addTextToImage(baseImageUrl, wishes)
    console.log('Final image generated:', finalImagePath)

    res.status(200).json({ imageUrl: finalImagePath })
  } catch (error) {
    console.error('Error generating card:', error)
    res.status(500).json({ 
      message: `Failed to generate card: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: JSON.stringify(error, Object.getOwnPropertyNames(error))
    })
  }
}