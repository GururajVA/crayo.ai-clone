import { useState } from "react";
import axios from "axios";
import React from "react";

interface CaptionResponse {
  text: string;
}

export default function CaptionGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [captions, setCaptions] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post<CaptionResponse>(
        "/api/caption-generator",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setCaptions(res.data.text);
    } catch (error) {
      console.error("Error generating captions:", error);
      setCaptions(
        error instanceof Error 
          ? error.message 
          : "Failed to generate captions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // The rest of the component remains the same
  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Auto Caption Generator</h1>

      <input
        type="file"
        accept="audio/*,video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 block"
      />

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Captions"}
      </button>

      {captions && (
        <div className="mt-8 p-4 rounded-lg bg-gray-800">
          <h2 className="text-2xl font-semibold mb-2">Generated Captions:</h2>
          <p className="whitespace-pre-wrap">{captions}</p>
        </div>
      )}
    </div>
  );
}