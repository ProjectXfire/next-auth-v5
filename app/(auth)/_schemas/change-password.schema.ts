import { z } from 'zod';
import { PASSWORD_VALIDATIONS } from '@/shared/constants';

export const ChangePasswordSchema = z
  .object({
    password: PASSWORD_VALIDATIONS,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
