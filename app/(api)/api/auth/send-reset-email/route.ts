import { NextResponse } from 'next/server';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';
import { db } from '@/core/lib';
import { ChangePasswordSchema } from '@/app/(auth)/_schemas';
import { createResetToken } from '@/core/services/auth/server';
import { sendResetPasswordEmail } from '@/core/adapters';

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<null>>> {
  try {
    const { email } = await req.json();
    if (!email)
      return NextResponse.json(
        { error: 'Invalid email', success: null, data: null },
        { status: 400 }
      );
    const validatedFields = ChangePasswordSchema.safeParse({ email });
    if (!validatedFields.success)
      return NextResponse.json(
        { error: 'Invalid email', success: null, data: null },
        { status: 400 }
      );
    const userDb = await db.user.findFirst({ where: { email } });
    if (!userDb)
      return NextResponse.json(
        { error: 'Email not found', success: null, data: null },
        { status: 400 }
      );
    const resetToken = await createResetToken(userDb.email);
    if (!resetToken)
      return NextResponse.json(
        { error: 'Internal error server', success: null, data: null },
        { status: 500 }
      );
    const sendResetEmail = await sendResetPasswordEmail(resetToken.email, resetToken.token);
    if (!sendResetEmail)
      return NextResponse.json(
        { error: 'Error on send email, please try again', success: null, data: null },
        { status: 400 }
      );
    return NextResponse.json(
      { error: null, success: 'Reset email sent', data: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 500 }
    );
  }
}
