const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError('')
  setGeneratedImage('')

  console.log('Form submitted') // 新增

  try {
    console.log('Submitting wishes:', wishes)
    const response = await fetch('/api/generate-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wishes }),
    })

    console.log('Response received:', response.status) // 新增

    const data = await response.json()
    console.log('Received data:', data)
    setGeneratedImage(data.imageUrl)
  } catch (error) {
    console.error('Error generating card:', error)
    setError(error.message || 'Failed to generate card. Please try again.')
  } finally {
    setIsLoading(false)
    console.log('Request completed') // 新增
  }
}