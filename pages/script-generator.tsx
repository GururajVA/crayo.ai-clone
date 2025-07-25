import { useState } from "react";
import axios from "axios";
import React from "react";

interface ScriptResponse {
  content: string;
}

export default function ScriptGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateScript = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.post<ScriptResponse>("/api/script-generator", {
        messages: [
          {
            role: "system",
            content: "You are a professional script writer. Generate creative and engaging scripts based on the user's prompt."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });
      setResult(res.data.content);
    } catch (error) {
      console.error("Error generating script:", error);
      setError("Failed to generate script. Please try again.");
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">AI Script Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        className="w-full p-4 rounded-lg bg-gray-800 mb-4"
        rows={6}
      />
      <button
        onClick={generateScript}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Script"}
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 p-4 rounded-lg bg-gray-800">
          <h2 className="text-2xl font-semibold mb-2">Generated Script:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}