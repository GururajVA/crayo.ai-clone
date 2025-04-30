// utils/auth.ts
import { useClerk } from "@clerk/nextjs";

export const useAuthActions = () => {
  const { signOut, redirectToSignIn } = useClerk();

  const login = async () => {
    try {
      await redirectToSignIn();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return { login, logout };
};