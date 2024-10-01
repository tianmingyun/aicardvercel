import axios, { AxiosError } from 'axios';
import * as crypto from 'crypto';

const APP_ID = process.env.XFYUN_APP_ID;
const API_KEY = process.env.XFYUN_API_KEY;
const API_SECRET = process.env.XFYUN_API_SECRET;

console.log('APP_ID:', APP_ID);
console.log('API_KEY:', API_KEY);
console.log('API_SECRET:', API_SECRET ? 'Set' : 'Not set');

if (!APP_ID || !API_KEY || !API_SECRET) {
  console.error('Missing Xfyun API credentials. Please check your environment variables.');
  throw new Error('Missing Xfyun API credentials');
}

interface XfyunResponse {
  header: {
    code: number;
    message: string;
    sid: string;
  };
  payload: {
    choices: {
      text: {
        content: string;
      }[];
    };
  };
}

export async function generateImageWithXfyun(prompt: string): Promise<string> {
  if (!API_SECRET) {
    throw new Error('API_SECRET is not defined');
  }

  const url = 'https://spark-api.cn-huabei-1.xf-yun.com/v2.1/tti';
  const host = 'spark-api.cn-huabei-1.xf-yun.com';
  const path = '/v2.1/tti';
  const date = new Date().toUTCString();

  const data = JSON.stringify({
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
  });

  // Generate tmp string
  const tmp = `host: ${host}\ndate: ${date}\nPOST ${path} HTTP/1.1`;

  // Generate signature
  const tmp_sha = crypto.createHmac('sha256', API_SECRET).update(tmp).digest();
  const signature = tmp_sha.toString('base64');

  // Generate authorization_origin
  const authorization_origin = `api_key="${API_KEY}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;

  // Generate final authorization
  const authorization = Buffer.from(authorization_origin).toString('base64');

  console.log('Request URL:', url);
  console.log('Request data:', data);
  console.log('Authorization header:', authorization);

  // Generate final URL with query parameters
  const queryParams = new URLSearchParams({
    authorization: authorization,
    date: date,
    host: host
  });
  const finalUrl = `${url}?${queryParams.toString()}`;

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