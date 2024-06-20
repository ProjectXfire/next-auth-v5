import { auth } from '@/auth';
import { Session } from 'next-auth';

export async function getCurrentSession(): Promise<Session | null> {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    return null;
  }
}
