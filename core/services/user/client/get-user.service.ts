import type { UserEntity } from '@/core/entities/user';
import type { IResponse } from '@/shared/interfaces';

export async function getUserById(id: string): Promise<IResponse<UserEntity | null>> {
  try {
    const res = await fetch(`/api/user/${id}`, { method: 'GET' });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    const data = await res.json();
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
