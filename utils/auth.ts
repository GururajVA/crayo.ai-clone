// Fix Clerk integration
import { auth, currentUser } from '@clerk/nextjs/server';

export const getCurrentUser = async () => {
  const user = await currentUser();
  return user;
};

export const checkAuth = () => {
  const { userId } = auth();
  return !!userId;
};