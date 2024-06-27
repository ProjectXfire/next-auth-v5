import type { LoginDto } from '@/core/dtos/auth';
import type { UserEntity } from '@/core/entities/user';
import type { IResponse } from '@/shared/interfaces';
import { TF_TOKEN } from '@/shared/constants';
import { signIn } from 'next-auth/react';

export async function login(payload: LoginDto): Promise<IResponse<null | UserEntity>> {
  try {
    const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
    if (!res.ok) {
      const data = await res.json();
      if (res.status === 403) {
        if (data.success === TF_TOKEN)
          return {
            error: null,
            data: data.data,
            success: data.success,
          };
      }
      throw new Error(data.error);
    }
    const data = await res.json();
    await signIn('credentials', {
      ...data.data,
      redirect: true,
    });
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
