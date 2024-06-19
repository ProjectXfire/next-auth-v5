import { UserEntity } from '@/core/entities/user';
import type { IResponse } from '@/shared/interfaces';

export async function getUserByEmail(email: string): Promise<IResponse<UserEntity | null>> {
  try {
    const res = await fetch(`/api/user/${email}`, { method: 'GET' });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    const data = await res.json();
    const user = UserEntity.fromObject(data.data);
    return {
      data: user,
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
