import { useState } from "react";
import axios from "axios";
import React from "react";

interface RedditStoryResponse {
  storyText: string;
}

interface VideoResponse {
  videoUrl: string;
}

export default function RedditStory() {
  const [redditUrl, setRedditUrl] = useState("");
  const [storyText, setStoryText] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  const fetchStory = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post<RedditStoryResponse>("/api/reddit-story", { redditUrl });
      setStoryText(res.data.storyText);
      setVideoUrl(""); // Clear previous video
    } catch (error) {
      console.error("Error fetching story:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch story");
      setStoryText("");
    } finally {
      setLoading(false);
    }
  };

  const generateVideo = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post<VideoResponse>("/api/reddit-story-video", { storyText });
      setVideoUrl(res.data.videoUrl);
    } catch (error) {
      console.error("Error generating video:", error);
      setError(error instanceof Error ? error.message : "Failed to generate video");
      setVideoUrl("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Reddit Story Video Creator</h1>

      <input
        type="text"
        placeholder="Enter Reddit thread URL..."
        value={redditUrl}
        onChange={(e) => setRedditUrl(e.target.value)}
        className="w-full p-4 mb-4 rounded-lg bg-gray-800"
      />

      <button
        onClick={fetchStory}
        disabled={loading || !redditUrl}
        className="px-6 py-3 mb-8 bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50"
      >
        {loading ? "Fetching Story..." : "Fetch Story"}
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {storyText && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Fetched Story:</h2>
          <textarea
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-800"
            rows={8}
          />
          <button
            onClick={generateVideo}
            disabled={loading}
            className="px-6 py-3 mt-4 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
          >
            {loading ? "Generating Video..." : "Generate Video"}
          </button>
        </div>
      )}

      {videoUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Generated Video:</h2>
          <video 
            src={videoUrl} 
            controls 
            className="rounded-lg mx-auto w-full max-w-2xl" 
          />
        </div>
      )}
    </div>
  );
}