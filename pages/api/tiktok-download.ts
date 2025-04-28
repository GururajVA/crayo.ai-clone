import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "Missing URL" });
  }

  try {
    // External free API — no watermark TikTok downloader
    const apiUrl = `https://api.tikmate.app/api/lookup?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== "ok") {
      return res.status(400).json({ message: "Failed to fetch TikTok download link." });
    }
    if (!res.ok) throw new Error(data.message);

    // ✅ Auto download
    const a = document.createElement("a");
    a.href = data.downloadUrl;
    a.download = data.title || "tiktok-video.mp4"; // Download filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    
    setDownloadLink(data.downloadUrl);
    
    const videoDownloadUrl = `https://tikmate.app/download/${data.token}/${data.id}.mp4`;
    const thumbnailUrl = `https://tikmate.app/thumbnail/${data.id}.jpg`; // 📸

    return res.status(200).json({
      downloadUrl: videoDownloadUrl,
      thumbnailUrl,    // 👍 new field
      title: data.title || "TikTok Video",
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
function setDownloadLink(downloadUrl: any) {
  throw new Error("Function not implemented.");
}

