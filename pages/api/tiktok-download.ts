import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

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
    
    const response = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const data = response.data.data;

    if (!data) {
      return res.status(500).json({ error: 'Failed to fetch TikTok data' });
    }

    const result = {
      url: data.play,
      author: data.author?.unique_id || 'Unknown',
      title: data.title || 'TikTok Video',
      duration: data.duration,
      thumbnail: data.cover,
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
    res.status(500).json({ error: 'Failed to download TikTok video' });
  }
}