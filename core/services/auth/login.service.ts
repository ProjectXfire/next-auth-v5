import type { LoginDto } from '@/core/dtos/auth';
import type { IResponse } from '@/shared/interfaces';
import { LoginSchema } from '@/app/(auth)/_schemas';

export async function login(payload: LoginDto): Promise<IResponse<null>> {
  try {
    const validatedFields = LoginSchema.safeParse(payload);
    if (!validatedFields.success) throw new Error('Invalid fields');
    const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    const data = await res.json();
    return {
      error: null,
      data: null,
      success: data.success,
    };
  } catch (error: any) {
    return {
      error: error.message,
      data: null,
      success: null,
    };
  }
}
