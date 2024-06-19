import type { RegisterDto } from '@/core/dtos/auth';
import type { IResponse } from '@/shared/interfaces';
import { RegisterSchema } from '@/app/(auth)/_schemas';

export async function register(payload: RegisterDto): Promise<IResponse<null>> {
  try {
    const validatedFields = RegisterSchema.safeParse(payload);
    if (!validatedFields.success) throw new Error('Invalid fields');
    // const res = await fetch('');
    return {
      error: null,
      data: null,
      success: 'Email sent!',
    };
  } catch (error: any) {
    return {
      error: error.message,
      data: null,
      success: null,
    };
  }
}
