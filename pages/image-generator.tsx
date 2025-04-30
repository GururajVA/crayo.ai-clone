import { useState } from "react";
import axios from "axios";
import React from "react";

interface ImageResponse {
  url: string;
}

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post<ImageResponse>("/api/image-generator", { prompt });
      setImageUrl(res.data.url);
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image. Please try again.");
      setImageUrl("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">AI Image Generator</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the image you want to create..."
        className="w-full p-4 rounded-lg bg-gray-800 mb-4"
        rows={4}
      />
      
      <button
        onClick={generateImage}
        disabled={loading}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Generated Image:</h2>
          <img 
            src={imageUrl} 
            alt="Generated AI content" 
            className="rounded-lg mx-auto max-w-full h-auto"
          />
        </div>
      )}
    </div>
  );
}