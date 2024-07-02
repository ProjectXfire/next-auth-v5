import { NextResponse } from 'next/server';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';
import { getResetTokenByToken } from '@/core/services/auth/server';
import { PasswordResetTokenEntity } from '@/core/entities/auth';

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<PasswordResetTokenEntity | null>>> {
  try {
    const { token } = await req.json();
    const existToken = await getResetTokenByToken(token);
    if (!existToken)
      return NextResponse.json(
        { error: 'Token does not exist', success: null, data: null },
        { status: 401 }
      );
    const hasExpired = new Date(existToken.expires) < new Date();
    if (hasExpired)
      return NextResponse.json(
        {
          error: 'Token has expired!, please re-send email to change password.',
          success: null,
          data: null,
        },
        { status: 401 }
      );
    const tokenEntity = PasswordResetTokenEntity.fromObject(existToken);
    return NextResponse.json(
      { data: tokenEntity, success: 'Token validated', error: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 500 }
    );
  }
}
