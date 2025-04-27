// /pages/vocal-remover.tsx

import { useState } from "react";
import axios from "axios";
import React from "react";

export default function VocalRemover() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [vocalUrl, setVocalUrl] = useState("");
  const [instrumentalUrl, setInstrumentalUrl] = useState("");

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const splitAudio = async () => {
    if (!audioFile) return;

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      setProcessing(true);
      const res = await axios.post("/api/vocal-remover", formData);
      setVocalUrl(res.data.vocalUrl);
      setInstrumentalUrl(res.data.instrumentalUrl);
    } catch (error) {
      console.error("Error splitting audio:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Vocal Remover</h1>

      <input
        type="file"
        accept="audio/*"
        onChange={handleAudioUpload}
        className="mb-6 block"
      />

      <button
        onClick={splitAudio}
        disabled={processing || !audioFile}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50"
      >
        {processing ? "Processing..." : "Split Audio"}
      </button>

      <div className="mt-8 space-y-6">
        {vocalUrl && (
          <div>
            <h2 className="text-xl font-semibold">Vocals:</h2>
            <audio src={vocalUrl} controls className="mt-2 w-full" />
          </div>
        )}
        {instrumentalUrl && (
          <div>
            <h2 className="text-xl font-semibold">Instrumental:</h2>
            <audio src={instrumentalUrl} controls className="mt-2 w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
