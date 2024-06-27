import { NextResponse } from 'next/server';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';
import { TF_TOKEN } from '@/shared/constants';
import { UserEntity } from '@/core/entities/user';
import { LoginSchema } from '@/app/(auth)/_schemas';
import { db } from '@/core/lib';
import { checkPassword, sendTwoFactorEmail, sendVerificationEmail } from '@/core/adapters';
import { createTwoFactorToken, createVerificationToken } from '@/core/services/auth/server';

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
    const validatedFields = LoginSchema.safeParse({ email, password });
    if (!validatedFields.success)
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
    /* Validate email verified*/
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
        { error: null, success: 'Confirmation email re-sent!', data: null },
        { status: 403 }
      );
    }
    /* Validate if have two factor auth activated */
    if (userDb.isTwoFactorEnabled) {
      const twoFactorToken = await createTwoFactorToken(userDb.email);
      if (!twoFactorToken)
        return NextResponse.json(
          { error: 'Two factor error', success: null, data: null },
          { status: 400 }
        );
      const { email, token } = twoFactorToken;
      const sendFactorToken = await sendTwoFactorEmail(email, token);
      if (!sendFactorToken)
        return NextResponse.json(
          { error: 'Error on send code', success: null, data: null },
          { status: 400 }
        );
      const user = UserEntity.fromObject(userDb);
      return NextResponse.json({ error: null, success: TF_TOKEN, data: user }, { status: 403 });
    }
    const user = UserEntity.fromObject(userDb);
    return NextResponse.json({ data: user, success: 'User valid', error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 500 }
    );
  }
}
