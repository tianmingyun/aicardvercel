import React, { useState } from 'react'
import Image from 'next/image'

export default function CardGenerator() {
  const [wishes, setWishes] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setGeneratedImage('')

    console.log('Form submitted')

    try {
      console.log('Submitting wishes:', wishes)
      const response = await fetch('/api/generate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wishes }),
      })

      console.log('Response received:', response.status)

      const data = await response.json()
      console.log('Received data:', data)
      setGeneratedImage(data.imageUrl)
    } catch (error) {
      console.error('Error generating card:', error)
      setError(error.message || 'Failed to generate card. Please try again.')
    } finally {
      setIsLoading(false)
      console.log('Request completed')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="wishes" className="block text-sm font-medium text-gray-700 mb-2">
            请输入祝福语
          </label>
          <input
            type="text"
            id="wishes"
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? '生成中...' : '一键生成祝福贺卡图片'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {generatedImage && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">生成图片展示区域</h2>
          <div className="border-2 border-gray-300 rounded-md p-4">
            <Image src={generatedImage} alt="Generated greeting card" width={500} height={300} layout="responsive" />
          </div>
        </div>
      )}
    </div>
  )
}