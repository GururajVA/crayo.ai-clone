import { useState } from 'react';
import Link from 'next/link';

interface VideoData {
  title: string;
  thumbnail: string;
  formats: {
    qualityLabel: string;
    url: string;
    container: string;
    mimeType?: string;
  }[];
}

export default function Downloader() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [data, setData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams({
        url,
        platform
      });

      const response = await fetch(`/api/download?${params}`);
      if (!response.ok) throw new Error('Failed to fetch video info');
      
      const result = await response.json();
      if (result.error) throw new Error(result.error);

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download video');
    } finally {
      setLoading(false);
    }
  };
  // Add to your existing youtube-tiktok-downloader.tsx
  const handleTikTokDownload = async (downloadUrl: string) => {
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tiktok-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setError('Failed to download video file');
    }
  };

// Update your download button for TikTok
{platform === 'tiktok' && data?.formats.map((format, index) => (
  <button
    key={index}
    onClick={() => handleTikTokDownload(format.url)}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Download {format.quality}
  </button>
))}
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-6">Video Downloader</h1>

        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col space-y-4">
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="youtube">YouTube</option>
              <option value="tiktok" disabled>TikTok (Coming Soon)</option>
            </select>

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={`Enter ${platform} video URL`}
              className="p-2 border rounded"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Analyzing...' : 'Download'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {data && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">{data.title}</h2>
              <img
                src={data.thumbnail}
                alt="Video thumbnail"
                className="w-full max-w-md rounded-lg mb-4"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Available Formats:</h3>
              {data.formats.map((format, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded hover:bg-gray-50"
                >
                  <div>
                    <span className="font-medium">{format.qualityLabel}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({format.container})
                    </span>
                  </div>
                  <a
                    href={format.url}
                    download
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}