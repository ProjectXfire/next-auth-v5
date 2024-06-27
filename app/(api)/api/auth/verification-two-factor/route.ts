import { NextResponse } from 'next/server';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';
import { UserEntity } from '@/core/entities/user';
import { getTwoFactorTokenByEmail } from '@/core/services/auth/server';
import { db } from '@/core/lib';

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<null | UserEntity>>> {
  try {
    const { code, email, userId } = await req.json();
    if (!code || !email || !userId)
      return NextResponse.json(
        { error: 'Missing fields', success: null, data: null },
        { status: 400 }
      );
    const twoFactorToken = await getTwoFactorTokenByEmail(email);
    if (!twoFactorToken)
      return NextResponse.json(
        { error: 'Invalid code', success: null, data: null },
        { status: 400 }
      );
    if (twoFactorToken.token !== code)
      return NextResponse.json(
        { error: 'Invalid code', success: null, data: null },
        { status: 400 }
      );
    const hasExpires = new Date(twoFactorToken.expires) < new Date();
    if (hasExpires)
      return NextResponse.json(
        { error: 'Code has expired', success: null, data: null },
        { status: 400 }
      );
    await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });
    const userDb = await db.user.findUnique({ where: { id: userId } });
    if (!userDb)
      return NextResponse.json(
        { error: 'User not found', success: null, data: null },
        { status: 400 }
      );
    const user = UserEntity.fromObject(userDb);
    return NextResponse.json(
      { data: user, success: 'Successful login', error: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 500 }
    );
  }
}
