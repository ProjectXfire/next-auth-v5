import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import type { UserAuth } from './core/types/user';
import { db } from './core/lib';
import { getAccountByUserId, getUserById, updateEmailVerified } from './core/services/user/server';

declare module 'next-auth' {
  interface Session {
    user: UserAuth;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await updateEmailVerified(user.id);
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;
      const account = await getAccountByUserId(user.id);
      user.isOauth = !!account;
      token.user = user;
      return token;
    },
    async session({ token, session }) {
      if (token.user && session.user) session.user = { ...session.user, ...token.user };
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
