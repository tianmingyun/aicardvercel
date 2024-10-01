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

export async function addTextToImage(imageUrl: string, text: string): Promise<string> {
  try {
    console.log('Adding text to image:', imageUrl, text);
    const image = await loadImage(imageUrl);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Draw the base image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Configure text style
    ctx.font = '32px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add text to the image
    ctx.fillText(text, canvas.width / 2, canvas.height - 50);

    // Return the image as a data URL
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error adding text to image:', error);
    throw error;
  }
}