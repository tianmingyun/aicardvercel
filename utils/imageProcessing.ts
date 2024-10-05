import axios from 'axios';

// 其他代码保持不变...

// 定义 API URL 常量
const DIFY_API_URL = 'https://api.dify.ai/v1/files/images';

// 其他代码保持不变...

export async function generateImage(prompt: string): Promise<string> {
  try {
    console.log('Generating image for prompt:', prompt);
    const optimizedPrompt = buildOptimizedPrompt(prompt);
    console.log('Optimized prompt:', optimizedPrompt);

    const response = await axios.post(
      DIFY_API_URL,  // 使用定义的常量
      {
        prompt: optimizedPrompt,
        response_format: 'url',
        n: 1,
        size: '1024x1024'
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DIFY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const imageUrl = response.data.data[0].url;
    console.log('Image generated:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}