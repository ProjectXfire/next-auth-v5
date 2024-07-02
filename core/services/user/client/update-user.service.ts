import type { UpdateUserDto } from '@/core/dtos/user';
import type { UserEntity } from '@/core/entities/user';
import type { IResponse } from '@/shared/interfaces';

export async function updateUser(
  id: string,
  payload: UpdateUserDto
): Promise<IResponse<UserEntity | null>> {
  try {
    const res = await fetch(`/api/user/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return {
      error: null,
      success: data.success,
      data: data.data,
    };
  } catch (error: any) {
    return {
      error: error.message,
      success: null,
      data: null,
    };
  }
}
