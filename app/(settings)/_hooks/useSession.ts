import { UserEntity } from '@/core/entities/user';
import { useSession } from 'next-auth/react';

export function useCurrentSession(): UserEntity | null {
  const session = useSession();
  if (!session.data) return null;
  const user = UserEntity.fromObject(session.data.user);
  return user;
}
