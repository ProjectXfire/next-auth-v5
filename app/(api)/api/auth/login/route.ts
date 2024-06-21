import { checkPassword } from '@/core/adapters';
import { UserEntity } from '@/core/entities/user';
import { db } from '@/core/lib';
import { NextResponse } from 'next/server';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';

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
    /*if (!userDb.emailVerified)
      return NextResponse.json(
        { error: 'Something went wrong', success: null, data: null },
        { status: 400 }
      );*/
    const user = UserEntity.fromObject(userDb);
    return NextResponse.json({ data: user, success: 'User valid', error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 400 }
    );
  }
}
