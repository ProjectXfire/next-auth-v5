import { NextResponse } from 'next/server';
import { UserEntity } from '@/core/entities/user';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';
import { db } from '@/core/lib';
import {
  deleteVerificationToken,
  getVerificationTokenByToken,
} from '@/core/services/verification-token/server';

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<null | UserEntity>>> {
  try {
    const { token } = await req.json();
    const existToken = await getVerificationTokenByToken(token);
    if (!existToken)
      return NextResponse.json(
        { error: 'Token does not exist', success: null, data: null },
        { status: 400 }
      );
    const hasExpired = new Date(existToken.expires) < new Date();
    if (hasExpired)
      return NextResponse.json(
        {
          error: 'Token has expired!, please re-send confirmation email on login.',
          success: null,
          data: null,
        },
        { status: 400 }
      );
    const existUser = await db.user.findFirst({ where: { email: existToken.email } });
    if (!existUser)
      return NextResponse.json(
        { error: 'Email does not exist', success: null, data: null },
        { status: 400 }
      );
    const userDb = await db.user.update({
      where: { id: existUser.id },
      data: { emailVerified: new Date(), email: existToken.email },
    });
    await deleteVerificationToken(existToken.id);
    const user = UserEntity.fromObject(userDb);
    return NextResponse.json(
      { data: user, success: 'Successful email confirmation!, You can login now.', error: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 500 }
    );
  }
}
