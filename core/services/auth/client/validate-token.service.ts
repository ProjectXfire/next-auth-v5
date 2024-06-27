import type { PasswordResetTokenEntity } from '@/core/entities/auth';
import type { IResponse } from '@/shared/interfaces';

export async function validateResetToken(
  token: string
): Promise<IResponse<null | PasswordResetTokenEntity>> {
  try {
    const res = await fetch('/api/auth/verification-reset-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    const data = await res.json();
    return {
      error: null,
      data: data.data,
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
