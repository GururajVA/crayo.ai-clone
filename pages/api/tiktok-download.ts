import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface TikWmApiResponse {
  data?: {
    play?: string;
    wmplay?: string;
    cover?: string;
    title?: string;
    author?: {
      unique_id?: string;
    };
    duration?: number;
  };
  code?: number;
  msg?: string;
}

interface TikTokResponse {
  url: string;
  author: string;
  title: string;
  duration: number;
  thumbnail: string;
  formats: {
    quality: string;
    format: string;
    url: string;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TikTokResponse | { error: string }>
) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing TikTok URL' });
  }

  try {
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
    
    const response = await axios.get<TikWmApiResponse>(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.data?.data) {
      const errorMessage = response.data?.msg || 'No video data found';
      return res.status(500).json({ error: errorMessage });
    }

    const data = response.data.data;

    if (!data.play || !data.wmplay) {
      return res.status(500).json({ error: 'Missing video URLs in response' });
    }

    const result: TikTokResponse = {
      url: data.play,
      author: data.author?.unique_id || 'Unknown',
      title: data.title || 'TikTok Video',
      duration: data.duration || 0,
      thumbnail: data.cover || '',
      formats: [
        {
          quality: 'HD',
          format: 'MP4',
          url: data.play
        },
        {
          quality: 'Watermarked',
          format: 'MP4',
          url: data.wmplay
        }
      ]
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('TikTok download error:', error);
    let errorMessage = 'Failed to download TikTok video';
    
    // Type-safe error handling
    if (typeof error === 'object' && error !== null) {
      if ('response' in error) {
        const axiosError = error as { response?: { data?: { msg?: string } } };
        errorMessage = axiosError.response?.data?.msg || errorMessage;
      } else if ('message' in error) {
        errorMessage = (error as { message: string }).message;
      }
    }

    res.status(500).json({ error: errorMessage });
  }
}