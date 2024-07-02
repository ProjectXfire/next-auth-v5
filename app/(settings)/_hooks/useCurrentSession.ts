import { UserAuth } from '@/core/types/user';
import { useSession } from 'next-auth/react';

export function useCurrentSession(): UserAuth | null {
  const session = useSession();
  if (!session.data) return null;
  return session.data.user;
}
