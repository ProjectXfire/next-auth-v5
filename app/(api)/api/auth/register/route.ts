import { hashPassword } from '@/core/adapters';
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
    const { name, email, password } = await req.json();
    if (!email || !password || !name)
      return NextResponse.json(
        { error: 'Missing fields', success: null, data: null },
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
        { status: 400 }
      );
    const userDb = await db.user.create({ data: { name, email, password: hashedPassword } });
    // Todo: Send verification token email
    const user = UserEntity.fromObject(userDb);
    return NextResponse.json(
      { data: user, success: 'Account created', error: null },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', success: null, data: null },
      { status: 400 }
    );
  }
}
