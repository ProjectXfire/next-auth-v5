import { signIn } from 'next-auth/react';
import type { UserEntity } from '@/core/entities/user';
import type { IResponse } from '@/shared/interfaces';
import { defaultLoginRedirect } from '@/shared/constants';

export async function confirmEmail(token: string): Promise<IResponse<UserEntity | null>> {
  try {
    const res = await fetch(`/api/auth/verification-token`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    const data = await res.json();
    /*await signIn('credentials', {
      ...data.data,
      callbackUrl: defaultLoginRedirect,
    });*/
    return {
      data: data.data,
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
