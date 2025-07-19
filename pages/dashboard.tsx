import { UserButton, useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Home, Settings, User } from "lucide-react";
import React from "react";

const tools = [
  {
    href: "/script-generator",
    icon: "✏️",
    label: "Script Generator",
    desc: "Generate creative scripts with AI."
  },
  {
    href: "/caption-generator",
    icon: "🎬",
    label: "Auto Captions",
    desc: "Create captions for your videos."
  },
  {
    href: "/voiceover-generator",
    icon: "🎤",
    label: "AI Voiceovers",
    desc: "Generate realistic voiceovers."
  },
  {
    href: "/fake-chat-generator",
    icon: "💬",
    label: "Fake Chat Generator",
    desc: "Create fake chat conversations."
  },
  {
    href: "/image-generator",
    icon: "🖼️",
    label: "AI Image Generator",
    desc: "Generate images from text."
  },
  {
    href: "/split-screen-editor",
    icon: "🎮",
    label: "Split Screen Editor",
    desc: "Edit videos in split screen."
  },
  {
    href: "/reddit-story",
    icon: "📖",
    label: "Reddit Story Videos",
    desc: "Turn Reddit stories into videos."
  },
];

export default function Dashboard() {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 flex">
      <SignedIn>
        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <div className="flex flex-col h-full justify-between p-6">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <span className="text-2xl font-extrabold text-purple-500 tracking-tight">Crayo.ai</span>
              </div>
              <nav className="flex flex-col gap-2">
                <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-200 hover:bg-purple-700/20 transition font-medium">
                  <Home className="w-5 h-5" /> Dashboard
                </Link>
                <Link href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-200 hover:bg-purple-700/20 transition font-medium">
                  <Settings className="w-5 h-5" /> Settings
                </Link>
                <div className="border-t border-gray-700 my-4" />
                {tools.map((tool) => (
                  <Link key={tool.href} href={tool.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-purple-700/20 hover:text-purple-400 transition font-medium">
                    <span className="text-lg">{tool.icon}</span> {tool.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3 mt-8">
              <UserButton afterSignOutUrl="/" />
              <span className="text-sm text-gray-300">{user?.firstName}</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64 transition-all duration-300">
          {/* Topbar */}
          <header className="flex items-center justify-between px-8 py-6 bg-gray-950/80 shadow-sm sticky top-0 z-30">
            <button className="md:hidden text-gray-200" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={32} />
            </button>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-white">Dashboard</span>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <User className="w-6 h-6 text-purple-400" />
              <span className="text-gray-300 font-medium">{user?.firstName}</span>
            </div>
          </header>

          {/* Welcome */}
          <main className="flex-1 p-8">
            <h1 className="text-4xl font-extrabold mb-2 text-white animate-fade-in">👋 Hi {user?.firstName || "there"}, welcome back!</h1>
            <p className="text-lg text-gray-400 mb-8 animate-fade-in delay-100">What would you like to create today?</p>

            {/* Tools grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {tools.map((tool, i) => (
                <Link key={tool.href} href={tool.href} className="group block rounded-2xl bg-gray-800/80 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-800 hover:border-purple-500">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{tool.icon}</span>
                    <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-200">{tool.label}</span>
                  </div>
                  <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-200">{tool.desc}</p>
                </Link>
              ))}
            </div>

            {/* Weekly Usage card */}
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-800/80 to-purple-600/80 flex items-center justify-between shadow-lg animate-fade-in delay-200">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">📊 Weekly Usage</h2>
                <p className="text-gray-200">
                  You used <span className="text-purple-200 font-bold">{tools.length} tools</span> this week!
                </p>
              </div>
            </div>
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

// Animations (add to your global.css or tailwind config)
// .animate-fade-in { animation: fadeIn 0.7s ease both; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }