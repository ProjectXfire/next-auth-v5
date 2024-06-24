import { checkPassword, sendVerificationEmail } from '@/core/adapters';
import { UserEntity } from '@/core/entities/user';
import { db } from '@/core/lib';
import { NextResponse } from 'next/server';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';
import { createVerificationToken } from '@/core/services/verification-token';

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<null | UserEntity>>> {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { error: 'Invalid credentials', success: null, data: null },
        { status: 400 }
      );
    const userDb = await db.user.findUnique({ where: { email } });
    if (!userDb)
      return NextResponse.json(
        { error: 'Invalid credentials', success: null, data: null },
        { status: 400 }
      );
    const isValidPassword = checkPassword(password, userDb.password!);
    if (!isValidPassword)
      return NextResponse.json(
        { error: 'Invalid credentials', success: null, data: null },
        { status: 400 }
      );
    if (!userDb.emailVerified) {
      const verificationToken = await createVerificationToken(userDb.email);
      if (!verificationToken)
        return NextResponse.json(
          { error: 'Internal error server', success: null, data: null },
          { status: 500 }
        );
      const resendEmail = await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      if (!resendEmail)
        return NextResponse.json(
          { error: 'Error on send email, please try again', success: null, data: null },
          { status: 400 }
        );
      return NextResponse.json(
        { error: 'Confirmation email re-sent!', success: null, data: null },
        { status: 403 }
      );
    }
    // Todo: add 2fa check
    const user = UserEntity.fromObject(userDb);
    return NextResponse.json({ data: user, success: 'User valid', error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 500 }
    );
  }
}
