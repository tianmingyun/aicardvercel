export async function generateImageWithXfyun(prompt: string): Promise<string> {
  const url = 'https://spark-api.xf-yun.com/v2.1/tti';
  const host = 'spark-api.xf-yun.com';
  const date = new Date().toUTCString();
  const algorithm = 'hmac-sha256';
  const headers = 'host date request-line';
  const signatureOrigin = `host: ${host}\ndate: ${date}\nPOST /v2.1/tti HTTP/1.1`;
  const signatureSha = crypto.createHmac('sha256', API_SECRET).update(signatureOrigin).digest('base64');
  const authorization = `api_key="${API_KEY}", algorithm="${algorithm}", headers="${headers}", signature="${signatureSha}"`;

  const data = {
    header: {
      app_id: APP_ID,
    },
    parameter: {
      chat: {
        domain: "general",
        temperature: 0.5,
        max_tokens: 2048,
      },
    },
    payload: {
      message: {
        text: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
    },
  };

  console.log('Request data:', JSON.stringify(data));
  console.log('Authorization header:', authorization);

  try {
    console.log('Sending request to Xfyun API...');
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Host': host,
        'Date': date,
        'Authorization': authorization,
      },
    });

    console.log('Received response from Xfyun API:', response.status, response.data);

    if (response.data.header.code !== 0) {
      throw new Error(`API error: ${response.data.header.message}`);
    }

    const imageBase64 = response.data.payload.image_list[0].image;
    return `data:image/png;base64,${imageBase64}`;
  } catch (error) {
    console.error('Error calling Xfyun API:', error.response ? error.response.data : error.message);
    throw error;
  }
}