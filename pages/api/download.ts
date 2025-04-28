import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';

interface VideoFormat {
  qualityLabel: string;
  url: string;
  container: string;
  mimeType?: string;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  formats: VideoFormat[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VideoInfo | { error: string }>
) {
  const { url, platform } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing video URL' });
  }

  try {
    if (platform === 'youtube') {
      const info = await ytdl.getInfo(url);
      const videoDetails = info.videoDetails;
      
      const formats = ytdl.filterFormats(info.formats, 'videoandaudio')
        .map(format => ({
          qualityLabel: format.qualityLabel || 'unknown',
          url: format.url,
          container: format.container,
          mimeType: format.mimeType
        }));

      return res.status(200).json({
        title: videoDetails.title,
        thumbnail: videoDetails.thumbnails[0].url,
        formats
      });
    }

    // Add TikTok handling here (would require different library)
    return res.status(400).json({ error: 'Platform not supported yet' });

  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ error: 'Failed to fetch video info' });
  }
}