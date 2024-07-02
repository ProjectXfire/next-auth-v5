import { User } from 'next-auth';

export type UserAuth = {
  role: 'ADMIN' | 'USER';
  emailVerified: string;
  isTwoFactorEnabled: boolean;
  isOauth: boolean;
} & User;
