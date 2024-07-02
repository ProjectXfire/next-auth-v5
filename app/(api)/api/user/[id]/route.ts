import { UserEntity } from '@/core/entities/user';
import { db } from '@/core/lib';
import { NextResponse } from 'next/server';
import type { IResponse } from '@/shared/interfaces';
import type { NextRequest } from 'next/server';
import { getCurrentSession } from '@/core/services/auth/server';
import { hashPassword } from '@/core/adapters';

interface IParams {
  params: { id: string };
}

export async function GET(
  req: NextRequest,
  { params }: IParams
): Promise<NextResponse<IResponse<null | UserEntity>>> {
  try {
    const { id } = params;
    if (!id)
      return NextResponse.json({ error: 'Missing Id', success: null, data: null }, { status: 400 });
    const userDb = await db.user.findUnique({ where: { id } });
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
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const { id } = params;
    const { password, isOauth, ...payload } = await req.json();
    if (!id)
      return NextResponse.json({ error: 'Missing Id', success: null, data: null }, { status: 400 });
    const isLogged = await getCurrentSession();
    if (!isLogged)
      return NextResponse.json(
        { error: 'Unauthorized', success: null, data: null },
        { status: 401 }
      );
    const userDb = await db.user.findUnique({ where: { id } });
    if (!userDb)
      return NextResponse.json(
        { error: 'Unauthorized', success: null, data: null },
        { status: 401 }
      );
    if (isOauth) {
      payload.password = undefined;
      payload.isTwoFactorEnabled = undefined;
    }
    let newPassword = password;
    if (password) {
      newPassword = hashPassword(password);
    }
    if (newPassword === null)
      return NextResponse.json(
        { error: 'Internal server error', success: null, data: null },
        { status: 500 }
      );
    const updateUser = await db.user.update({
      where: { id: userDb.id },
      data: { ...payload, password: newPassword },
    });
    const user = UserEntity.fromObject(updateUser);
    return NextResponse.json({ data: user, success: 'User updated', error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 500 }
    );
  }
}
