import { createCanvas, loadImage } from 'canvas';
import { generateImageWithXfyun } from './xfyunApi';

export async function generateImage(prompt: string): Promise<string> {
  try {
    console.log('Generating image for prompt:', prompt);
    const imageUrl = await generateImageWithXfyun(prompt);
    console.log('Image generated:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

// We no longer need this function as we'll render text on the client side
// export async function addTextToImage(imageUrl: string, text: string): Promise<string> { ... }