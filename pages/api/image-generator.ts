import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Type definitions
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

    const imageUrl = response.data[0].url;
    
    if (!imageUrl) {
      throw new Error('Failed to generate image');
    }

    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
    res.status(500).json({ error: errorMessage });
  }
}