import { z } from 'zod';

export const SendEmailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is not valid'),
});
