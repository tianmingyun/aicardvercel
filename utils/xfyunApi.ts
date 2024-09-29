import crypto from 'crypto';
import axios from 'axios';

const APP_ID = process.env.XFYUN_APP_ID || '';
const API_KEY = process.env.XFYUN_API_KEY || '';
const API_SECRET = process.env.XFYUN_API_SECRET || '';

if (!APP_ID || !API_KEY || !API_SECRET) {
  console.error('Missing Xfyun API credentials. Please check your environment variables.');
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

  try {
    const response = await axios.post<XfyunResponse>(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Host': host,
        'Date': date,
        'Authorization': authorization,
      },
    });

    if (response.data.header.code !== 0) {
      throw new Error(`API error: ${response.data.header.message}`);
    }

    const imageBase64 = response.data.payload.image_list[0].image;
    return `data:image/png;base64,${imageBase64}`;
  } catch (error) {
    console.error('Error calling Xfyun API:', error);
    throw error;
  }
}