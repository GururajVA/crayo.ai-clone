import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React from "react";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white">
      <h1 className="text-xl font-bold">Crayo.ai Clone</h1>
      <div>
        {isSignedIn ? <SignOutButton /> : <SignInButton />}
      </div>
    </nav>
  );
}
