// pages/index.tsx
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Crayo.ai Clone</title>
      </Head>

      <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">
          🎨 Welcome to Crayo.ai Clone
        </h1>

        <SignedOut>
          <button
            onClick={() => router.push("/sign-in")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg"
          >
            Sign In
          </button>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col items-center space-y-4">
            <UserButton />
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
            >
              Go to Dashboard
            </button>
          </div>
        </SignedIn>
      </main>
    </>
  );
}
