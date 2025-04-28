import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core"; // 🛑 You need to install this: npm install ytdl-core

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "Missing URL" });
  }

  try {
    // Validate URL
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ message: "Invalid YouTube URL" });
    }

    // Get video info
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: "highestvideo" });

    return res.status(200).json({
      downloadUrl: format.url,
      title: info.videoDetails.title,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong." });
    
    {thumbnail && (
      <div className="mt-6 text-center">
        <img src={thumbnail} alt="Video thumbnail" className="rounded-lg mx-auto mb-4" />
        <h2 className="text-lg font-semibold">{videoTitle}</h2>
        <p className="text-purple-400 mt-2">✅ Ready to download!</p>
      </div>
    )}
    
  }
}
