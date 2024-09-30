import axios, { AxiosError } from 'axios';

const APP_ID = process.env.XFYUN_APP_ID;
const API_KEY = process.env.XFYUN_API_KEY;
const API_SECRET = process.env.XFYUN_API_SECRET;

console.log('APP_ID:', APP_ID);
console.log('API_KEY:', API_KEY);
console.log('API_SECRET:', API_SECRET ? 'Set' : 'Not set');

if (!APP_ID || !API_KEY || !API_SECRET) {
  console.error('Missing Xfyun API credentials. Please check your environment variables.');
}

let crypto: any;

if (typeof window === 'undefined') {
  // Server-side
  crypto = require('crypto');
} else {
  // Client-side
  crypto = require('crypto-browserify');
}

interface XfyunResponse {
  header: {
    code: number;
    message: string;
    sid: string;
  };
  payload: {
    image_list: {
      image: string;
    }[];
  };
}

export async function generateImageWithXfyun(prompt: string): Promise<string> {
  const url = 'https://spark-api.cn-huabei-1.xf-yun.com/v2.1/tti';
  const host = 'spark-api.cn-huabei-1.xf-yun.com';
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

  console.log('Request URL:', url);
  console.log('Request data:', JSON.stringify(data));
  console.log('Authorization header:', authorization);

  try {
    console.log('Sending request to Xfyun API...');
    const response = await axios.post<XfyunResponse>(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Host': host,
        'Date': date,
        'Authorization': authorization,
      },
    });

    console.log('Received response from Xfyun API:', response.status, JSON.stringify(response.data));

    if (response.data.header.code !== 0) {
      throw new Error(`API error: ${response.data.header.message}`);
    }

    const imageBase64 = response.data.payload.image_list[0].image;
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