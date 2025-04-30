import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

interface VoiceoverResponse {
  audioUrl?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VoiceoverResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  if (!ELEVENLABS_API_KEY) {
    return res.status(500).json({ message: "API key not configured" });
  }

  try {
    const response = await axios.post<ArrayBuffer>(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
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

    const audioData = response.data;
    const audioBuffer = Buffer.from(audioData);
    const audioUrl = `data:audio/mpeg;base64,${audioBuffer.toString("base64")}`;

    return res.status(200).json({ audioUrl });
  } catch (error) {
    console.error("Error generating voiceover:", error);
    
    let errorMessage = "Failed to generate voiceover";
    
    // Type-safe error handling
    if (typeof error === "object" && error !== null) {
      if ("response" in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      } else if ("message" in error) {
        errorMessage = (error as { message: string }).message;
      }
    }

    return res.status(500).json({ message: errorMessage });
  }
}