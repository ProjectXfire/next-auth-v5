import { UserEntity } from '@/core/entities/user';
import { db } from '@/core/lib';
import { NextResponse } from 'next/server';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';

interface IParams {
  params: { email: string };
}

export async function GET(
  req: NextRequest,
  { params }: IParams
): Promise<NextResponse<IResponse<null | UserEntity>>> {
  try {
    const { email } = params;
    if (!email)
      return NextResponse.json(
        { error: 'Missing email', success: null, data: null },
        { status: 400 }
      );
    const userDb = await db.user.findUnique({ where: { email } });
    if (!userDb)
      return NextResponse.json(
        { error: 'User not found', success: null, data: null },
        { status: 400 }
      );
    const user = UserEntity.fromObject(userDb);
    return NextResponse.json({ data: user, success: 'User found', error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 400 }
    );
  }
}
