export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API route called') // 新增
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method) // 新增
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { wishes } = req.body
  console.log('Received wishes:', wishes)

  // ... 其余代码保持不变

  try {
    // ... 现有的代码

    console.log('Sending response') // 新增
    res.status(200).json({ imageUrl })
  } catch (error) {
    console.error('Error generating card:', error)
    res.status(500).json({ message: `Failed to generate card: ${error.message}` })
  }
}