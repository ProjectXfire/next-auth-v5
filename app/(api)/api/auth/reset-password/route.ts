import { NextResponse } from 'next/server';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';
import { db } from '@/core/lib';
import { UserEntity } from '@/core/entities/user';
import { hashPassword } from '@/core/adapters';
import { deleteResetToken } from '@/core/services/auth/server';

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<UserEntity | null>>> {
  try {
    const { email, password, tokenId } = await req.json();
    if (!email || !password || !tokenId)
      return NextResponse.json(
        { error: 'Missing fields', success: null, data: null },
        { status: 400 }
      );
    const hashedPassword = hashPassword(password);
    if (!hashedPassword)
      return NextResponse.json(
        { error: 'Internal error server', success: null, data: null },
        { status: 500 }
      );
    const userUpdated = await db.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    await deleteResetToken(tokenId);
    const user = UserEntity.fromObject(userUpdated);
    return NextResponse.json(
      { data: user, success: 'Successful password changed!', error: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 500 }
    );
  }
}
