// /pages/voiceover-generator.tsx

import { useState } from "react";
import axios from "axios";
import React from "react";

export default function VoiceoverGenerator() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVoiceover = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/voiceover-generator", { text });
      setAudioUrl(res.data.audioUrl);
    } catch (error) {
      console.error("Error generating voiceover:", error);
      setAudioUrl("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">AI Voiceover Generator</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to voiceover..."
        className="w-full p-4 rounded-lg bg-gray-800 mb-4"
        rows={6}
      />
      <button
        onClick={generateVoiceover}
        disabled={loading}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Voiceover"}
      </button>

      {audioUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Generated Voiceover:</h2>
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}
    </div>
  );
}
