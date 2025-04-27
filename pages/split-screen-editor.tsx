// /pages/split-screen-editor.tsx

import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

export default function SplitScreenEditor() {
  const [userVideo, setUserVideo] = useState<File | null>(null);
  const [gameplayVideo, setGameplayVideo] = useState<File | null>(null);

  const handleUserVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUserVideo(e.target.files[0]);
    }
  };

  const handleGameplayVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setGameplayVideo(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Split-Screen Editor</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <label className="block">
            <span className="text-lg">Upload Your Video:</span>
            <input
              type="file"
              accept="video/*"
              onChange={handleUserVideo}
              className="mt-2 block w-full"
            />
          </label>

          <label className="block">
            <span className="text-lg">Upload Gameplay Video:</span>
            <input
              type="file"
              accept="video/*"
              onChange={handleGameplayVideo}
              className="mt-2 block w-full"
            />
          </label>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {(userVideo || gameplayVideo) ? (
            <div className="flex flex-col md:flex-row">
              {userVideo && (
                <video
                  src={URL.createObjectURL(userVideo)}
                  controls
                  className="w-full md:w-1/2"
                />
              )}
              {gameplayVideo && (
                <video
                  src={URL.createObjectURL(gameplayVideo)}
                  controls
                  className="w-full md:w-1/2"
                />
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <Player
                autoplay
                loop
                src="https://assets4.lottiefiles.com/packages/lf20_puciaact.json"
                style={{ height: "150px", width: "150px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
