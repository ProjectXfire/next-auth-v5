import { z } from 'zod';

const passwordValidations = z
  .string()
  .min(8, 'Password must have at least 8 characters')
  .regex(/[A-Z]/, 'Password must have at least one capital letter')
  .regex(/[0-9]/, 'Password must have at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must have at least one special character');

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Email is not valid'),
  password: passwordValidations,
});
