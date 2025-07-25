import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import '../styles/nprogress.css';
// pages/_app.tsx
import '@/styles/global.css';  // Use absolute path alias
import type { AppProps } from 'next/app';
import { Inter } from "next/font/google"; // 👈 add this
import React from "react";
import NProgress from '@/lib/nprogress';
import '@/styles/global.css';
import 'nprogress/nprogress.css' assert { type: 'css' };

const inter = Inter({ subsets: ["latin"] }); // 👈 load font



export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <main className={inter.className}> {/* 👈 wrap in main */}
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
}
 