'use server';

import { IResponse } from '@/shared/interfaces';
import { getCurrentSession } from '../../auth/server';
import { Role } from '@/core/types/auth';

export async function testAdminRoleServer(): Promise<IResponse<null>> {
  try {
    const user = await getCurrentSession();
    if (!user)
      return {
        data: null,
        error: 'Session not found - Server Action',
        success: null,
      };
    if (user.role !== Role.ADMIN)
      return {
        data: null,
        error: 'Unauthorized access! - Server Action',
        success: null,
      };
    return {
      data: null,
      error: null,
      success: 'Admin User - Authorized - Server Action',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      success: null,
    };
  }
}
