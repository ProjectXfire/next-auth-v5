import { z } from 'zod';

export const ChangePasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is not valid'),
});
