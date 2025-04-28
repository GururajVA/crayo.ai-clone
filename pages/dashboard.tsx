import { UserButton, useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react"; // 🍔 hamburger icon
import React from "react";
import { Home, Settings, User, LogOut } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <div className="p-8">
      {loading ? (
        // ⏳ Loading Skeleton
        <div className="p-8 animate-pulse space-y-4">
          <div className="h-8 bg-gray-800 rounded" />
          <div className="h-6 bg-gray-800 rounded w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-800 rounded-2xl" />
            ))}
          </div>
        </div>
      ) : (
        // ✅ Actual dashboard content below
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
                {/* MOBILE BACKDROP */}
                {sidebarOpen && (
                  <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
                  />
                )}

                <div>
                  <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

                  <nav className="flex flex-col space-y-4">
                    {/* Sidebar links */}
                    <Link href="/dashboard" className="flex items-center gap-2 p-2 rounded-lg hover:text-purple-400 hover:drop-shadow-lg transition">
                      <Home className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 p-2 rounded-lg hover:text-purple-400 hover:drop-shadow-lg transition">
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                    {/* other links... */}
                  </nav>
                </div>

                {/* Logout section */}
                <div className="flex items-center space-x-3">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-sm">{user?.firstName}</span>
                </div>
              </aside>

              {/* Main content */}
              <main className="flex-1 p-8 overflow-y-auto ml-0 md:ml-64">
                <h1 className="text-3xl font-bold mb-6">
                  👋 Hi {user?.firstName || "there"}, welcome back!
                </h1>

                {/* Weekly Usage card */}
                <div className="mb-8 p-6 rounded-2xl bg-gray-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">📊 Weekly Usage</h2>
                    <p className="text-gray-400">
                      You used <span className="text-purple-400 font-bold">7 tools</span> this week!
                    </p>
                  </div>
                </div>

                {/* Tools grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Link href="/script-generator">
                    <div className="p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-transform transform hover:scale-105 cursor-pointer">
                      ✏️ Script Generator
                    </div>
                  </Link>
                  {/* other tool cards... */}
                </div>
              </main>
            </div>
          </SignedIn>

          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </div>
  );
}
