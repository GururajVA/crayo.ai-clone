// pages/api/caption-generator.ts
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

interface TranscriptionResponse {
  text: string;
  error?: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranscriptionResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ text: "", error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();

  try {
    const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ text: "", error: "No file uploaded" });
    }

    // Create a ReadStream instead of using Buffer
    const fileStream = fs.createReadStream(file.filepath);
    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
    if (file.size > MAX_FILE_SIZE) {
      return res.status(400).json({ text: "", error: "File too large" });
    }
    const transcription = await openai.audio.transcriptions.create({
      file: fileStream, // Use the stream directly
      model: "whisper-1",
      response_format: "text",
      filename: file.originalFilename || "audio.mp4", // Important for OpenAI
    });
    const ALLOWED_MIME_TYPES = ['audio/mpeg', 'audio/mp4', 'audio/wav'];
    if (!file.mimetype || !ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return res.status(400).json({ text: "", error: "Invalid file type" });
    }
    res.status(200).json({ text: transcription });
  } catch (error) {
    console.error("Error transcribing file:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ text: "", error: errorMessage });
  }
}