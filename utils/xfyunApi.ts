export async function generateImageWithXfyun(prompt: string): Promise<string> {
  // ... (previous code remains unchanged)

  try {
    console.log('Sending request to Xfyun API...');
    const response = await axios.post<XfyunResponse>(finalUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Host': host,
        'Date': date,
      },
    });

    console.log('Received response from Xfyun API:', response.status, JSON.stringify(response.data));

    if (response.data.header.code !== 0) {
      throw new Error(`API error: ${response.data.header.message}`);
    }

    // Extract the base64 image data from the response
    const imageBase64 = response.data.payload.choices.text[0].content;
    return `data:image/png;base64,${imageBase64}`;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<XfyunResponse>;
      console.error('Error calling Xfyun API:', JSON.stringify(axiosError.response?.data) || axiosError.message);
    } else {
      console.error('Error calling Xfyun API:', (error as Error).message);
    }
    throw error;
  }
}