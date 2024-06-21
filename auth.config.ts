import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const user = { ...credentials };
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
