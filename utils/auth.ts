import { SignIn, SignedOut } from "@clerk/nextjs";

// Custom helpers (optional)
export const login = async () => {
  try {
    await SignIn();
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const logout = async () => {
  try {
    await SignedOut();
  } catch (error) {
    console.error("Logout failed", error);
  }
};
