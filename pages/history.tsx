// pages/history.tsx
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function HistoryPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="min-h-screen bg-gray-950 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">📜 Your History</h1>
          <p className="text-gray-400 mb-6">
            All your previously generated content will appear here.
          </p>

          <div className="p-6 bg-gray-800 rounded-2xl">
            <p className="text-gray-300">🚧 Nothing yet. Generate some content!</p>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
