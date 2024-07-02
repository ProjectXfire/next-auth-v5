import { z } from 'zod';
import { PASSWORD_VALIDATIONS } from '@/shared/constants';

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Email is not valid'),
  password: PASSWORD_VALIDATIONS,
});
