import { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function YouTubeTikTokDownloader() {
  const [url, setUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setDownloadLink(null);
    if (!res.ok) throw new Error(data.message);

    setThumbnail(data.thumbnailUrl);
    setVideoTitle(data.title);
    setDownloadLink(data.downloadUrl);

    // ✅ Auto download
    const a = document.createElement("a");
    a.href = data.downloadUrl;
    a.download = data.title || "tiktok-video.mp4"; 
    document.body.appendChild(a);
    a.click();
    a.remove();
    try {
      // 🛑 FAKE API CALL (replace with your real backend if needed)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDownloadLink(url); // In real app, you'd get processed link here
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-950 text-white p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">📥 YouTube / TikTok Downloader</h1>
            <p className="text-gray-400">Paste a link and download videos easily!</p>
          </div>

          {/* Input Form */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube or TikTok URL..."
              className="p-4 rounded-lg bg-gray-800 flex-1 outline-none focus:ring-2 ring-purple-400"
            />
            <button
              onClick={handleDownload}
              disabled={loading || !url}
              className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg font-bold disabled:opacity-50"
            >
              {loading ? "Downloading..." : "Download"}
            </button>
          </div>

          {/* Download Link */}
          {downloadLink && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="mb-2">🎉 Download ready:</p>
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 underline hover:text-purple-300"
              >
                Click here to download your video
              </a>
            </div>
          )}

          {/* Back to Dashboard */}
          <div className="mt-8">
            <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 underline">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
