import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

interface GenerationRequest {
  prompt: string;
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
}

interface GenerationResponse {
  url?: string;
  error?: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerationResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, size = '1024x1024', quality = 'standard' } = req.body as GenerationRequest;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size,
      quality,
      response_format: 'url',
    });

    // Add type safety checks
    if (!response.data) {
      throw new Error('No image data received');
    }

    const firstImage = response.data[0];
    if (!firstImage) {
      throw new Error('Image array is empty');
    }

    const imageUrl = firstImage.url;
    if (!imageUrl) {
      throw new Error('Image URL is missing');
    }

    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
    res.status(500).json({ error: errorMessage });
  }
}