import { SignIn } from "@clerk/nextjs";
import Head from "next/head";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In - Crayo.ai Clone</title>
      </Head>
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-900 border border-gray-700",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
              formFieldInput: "bg-gray-800 border-gray-600 text-white",
              formFieldLabel: "text-gray-300",
              footerActionLink: "text-purple-400 hover:text-purple-300",
              dividerLine: "bg-gray-700",
              dividerText: "text-gray-400",
              socialButtonsBlockButton: "bg-gray-800 border-gray-600 text-white hover:bg-gray-700",
            },
          }}
        />
      </div>
    </>
  );
} 