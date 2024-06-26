import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is not valid'),
  password: z.string().min(1, 'Password is required'),
});
