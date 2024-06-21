import NextAuth from 'next-auth';
import type { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { db } from './core/lib';
import { UserEntity } from './core/entities/user';

declare module 'next-auth' {
  interface Session {
    user: {
      role: 'ADMIN' | 'USER';
      emailVerified: string;
    } & DefaultSession['user'];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (!user) return token;
      const userEntity = UserEntity.fromObject(user);
      token.user = userEntity;
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
