// /pages/api/voiceover-generator.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY; // You need to add this to your .env.local

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  try {
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL", // default voice ID
      {
        text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const audioBuffer = Buffer.from(response.data, "binary").toString("base64");
    const audioUrl = `data:audio/mpeg;base64,${audioBuffer}`;

    res.status(200).json({ audioUrl });
  } catch (error) {
    console.error("Error generating voiceover:", error);
    res.status(500).json({ message: "Failed to generate voiceover" });
  }
}
