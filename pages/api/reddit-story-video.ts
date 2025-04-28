// /pages/api/reddit-story-video.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { storyText } = req.body;

  if (!storyText) {
    return res.status(400).json({ message: "Story text is required" });
  } 

  try {
    // Normally: TTS + background + captions + merge into video
    // Here: Fake a video URL
    const fakeVideoUrl = "/sample-videos/fake-reddit-video.mp4";
    res.status(200).json({ videoUrl: fakeVideoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate video" });
  }
}
