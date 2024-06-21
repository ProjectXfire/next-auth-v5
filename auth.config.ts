import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { envs } from './shared/constants';

export default {
  providers: [
    Github({
      clientId: envs.githubClientId,
      clientSecret: envs.githubClientSecret,
    }),
    Google({
      clientId: envs.googleClientId,
      clientSecret: envs.googleClientSecret,
    }),
    Credentials({
      async authorize(credentials) {
        return credentials;
      },
    }),
  ],
} satisfies NextAuthConfig;
