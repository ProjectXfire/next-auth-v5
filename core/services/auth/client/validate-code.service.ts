import { signIn } from 'next-auth/react';
import type { TwoFactorDto } from '@/core/dtos/auth';
import type { IResponse } from '@/shared/interfaces';

export async function validateCode(payload: TwoFactorDto): Promise<IResponse<null>> {
  try {
    const res = await fetch('/api/auth/verification-two-factor', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    const data = await res.json();
    await signIn('credentials', {
      ...data.data,
      redirect: true,
    });
    return {
      data: null,
      error: null,
      success: data.success,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      success: null,
    };
  }
}
