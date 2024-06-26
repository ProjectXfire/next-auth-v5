import type { RegisterDto } from '@/core/dtos/auth';
import type { IResponse } from '@/shared/interfaces';

export async function register(payload: RegisterDto): Promise<IResponse<null>> {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
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
