import { NextResponse } from 'next/server';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';
import { UserEntity } from '@/core/entities/user';
import { db } from '@/core/lib';
import { hashPassword, sendVerificationEmail } from '@/core/adapters';
import { createVerificationToken } from '@/core/services/auth/server';
import { RegisterSchema } from '@/app/(auth)/_schemas';

//a9db9a27-a72b-474e-a87e-42c11ea2491c

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<null | UserEntity>>> {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password || !name)
      return NextResponse.json(
        { error: 'Missing fields', success: null, data: null },
        { status: 400 }
      );
    const validatedFields = RegisterSchema.safeParse({ email, password, name });
    if (!validatedFields.success)
      return NextResponse.json(
        { error: 'Invalid fields', success: null, data: null },
        { status: 400 }
      );
    const emailExist = await db.user.findUnique({ where: { email } });
    if (emailExist)
      return NextResponse.json(
        { error: 'Email already exist', success: null, data: null },
        { status: 400 }
      );
    const hashedPassword = hashPassword(password);
    if (!hashedPassword)
      return NextResponse.json(
        { error: 'Internal error server', success: null, data: null },
        { status: 500 }
      );
    const userDb = await db.user.create({
      data: { name, email, password: hashedPassword },
    });
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
        { error: 'Error on send email, please try again on login', success: null, data: null },
        { status: 400 }
      );
    const user = UserEntity.fromObject(userDb);
    return NextResponse.json(
      {
        data: user,
        success:
          'Confirmation email sent!, If the email does not exist you will not receive the email',
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 500 }
    );
  }
}
