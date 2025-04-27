import { UserButton, useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react"; // 🍔 hamburger icon
import React from "react";

export default function Dashboard() {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-950 text-white flex relative">

          {/* Mobile Hamburger Button */}
          <button
            className="absolute top-4 left-4 md:hidden z-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={32} />
          </button>

          {/* Sidebar */}
          <aside
            className={`bg-gray-900 p-6 flex flex-col justify-between 
            transition-all duration-500 ease-in-out  
            md:translate-x-0 md:relative md:w-64 w-64
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            fixed top-0 left-0 h-full z-40`}
          >
            <div>
              <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

              <nav className="flex flex-col space-y-4">
                <Link href="/dashboard" className="hover:text-purple-400" onClick={() => setSidebarOpen(false)}>
                  🏠 Home
                </Link>
                <Link href="/script-generator" className="hover:text-purple-400" onClick={() => setSidebarOpen(false)}>
                  ✏️ Script Generator
                </Link>
                <Link href="/caption-generator" className="hover:text-purple-400" onClick={() => setSidebarOpen(false)}>
                  🎬 Auto Captions
                </Link>
                <Link href="/voiceover-generator" className="hover:text-purple-400" onClick={() => setSidebarOpen(false)}>
                  🎤 AI Voiceovers
                </Link>
                <Link href="/fake-chat-generator" className="hover:text-purple-400" onClick={() => setSidebarOpen(false)}>
                  💬 Fake Chats
                </Link>
                <Link href="/image-generator" className="hover:text-purple-400" onClick={() => setSidebarOpen(false)}>
                  🖼️ AI Images
                </Link>
                <Link href="/split-screen-editor" className="hover:text-purple-400" onClick={() => setSidebarOpen(false)}>
                  🎮 Split Screen
                </Link>
                <Link href="/reddit-story-generator" className="hover:text-purple-400" onClick={() => setSidebarOpen(false)}>
                  📖 Reddit Videos
                </Link>
              </nav>
            </div>

            {/* Logout / Profile */}
            <div className="flex items-center space-x-3">
              <UserButton afterSignOutUrl="/" />
              <span className="text-sm">{user?.firstName}</span>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto ml-0 md:ml-64">
            <h1 className="text-3xl font-bold mb-6">
              👋 Hi {user?.firstName || "there"}, welcome back!
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tool cards */}
              <Link href="/script-generator">
                <div className="p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition cursor-pointer">
                  ✏️ Script Generator
                </div>
              </Link>
              <Link href="/caption-generator">
                <div className="p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition cursor-pointer">
                  🎬 Auto Captions
                </div>
              </Link>
              <Link href="/voiceover-generator">
                <div className="p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition cursor-pointer">
                  🎤 AI Voiceovers
                </div>
              </Link>
              <Link href="/fake-chat-generator">
                <div className="p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition cursor-pointer">
                  💬 Fake Chat Generator
                </div>
              </Link>
              <Link href="/image-generator">
                <div className="p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition cursor-pointer">
                  🖼️ AI Image Generator
                </div>
              </Link>
              <Link href="/split-screen-editor">
                <div className="p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition cursor-pointer">
                  🎮 Split Screen Editor
                </div>
              </Link>
              <Link href="/reddit-story-generator">
                <div className="p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition cursor-pointer">
                  📖 Reddit Story Videos
                </div>
              </Link>
            </div>
          </main>

        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
