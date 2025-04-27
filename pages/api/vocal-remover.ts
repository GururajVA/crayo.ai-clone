// /pages/api/vocal-remover.ts

import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = new formidable.IncomingForm({
    uploadDir: "./public/uploads",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Form parsing error" });
    }

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // In a real app: You'd send it to a vocal separator model/server
    // Here we fake it for now
    const filename = path.basename(file.filepath);
    const fakeVocalUrl = `/uploads/${filename}`;
    const fakeInstrumentalUrl = `/uploads/${filename}`;

    res.status(200).json({
      vocalUrl: fakeVocalUrl,
      instrumentalUrl: fakeInstrumentalUrl,
    });
  });
}
