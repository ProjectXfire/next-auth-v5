import { z } from 'zod';
import { PASSWORD_VALIDATIONS } from '@/shared/constants';

export const UserSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.boolean(),
    role: z.string(),
    password: z.optional(PASSWORD_VALIDATIONS),
    confirmPassword: z.optional(z.string()),
    isOauth: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
