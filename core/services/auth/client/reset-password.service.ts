import type { ChangePasswordDto, ResetPasswordEmailDto } from '@/core/dtos/auth';
import type { IResponse } from '@/shared/interfaces';

export async function resetPassword(
  tokenId: string,
  payload: ChangePasswordDto
): Promise<IResponse<null>> {
  try {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ ...payload, tokenId }),
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

export async function resetPasswordEmail(payload: ResetPasswordEmailDto): Promise<IResponse<null>> {
  try {
    const res = await fetch('/api/auth/send-reset-email', {
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
