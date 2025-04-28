// /pages/api/reddit-story.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { redditUrl } = req.body;

  if (!redditUrl) {
    return res.status(400).json({ message: "Reddit URL is required" });
  }
  
  try {
    // Here you would fetch Reddit API — for now we fake it
    const fakeStoryText = "Today I messed up by trusting my cat with my expensive cheese...";
    res.status(200).json({ storyText: fakeStoryText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch Reddit story" });
  }
}
