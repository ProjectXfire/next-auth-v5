import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/core/services/auth/server';
import { UserRole } from '@prisma/client';

export async function GET() {
  const user = await getCurrentSession();
  if (!user)
    return NextResponse.json(
      { data: user, success: null, error: 'Session not found' },
      { status: 400 }
    );
  if (user.role !== UserRole.ADMIN)
    return NextResponse.json(
      { data: user, success: null, error: 'Unauthorized access!' },
      { status: 403 }
    );
  return NextResponse.json(
    { data: user, success: 'Admin User - Authorized', error: null },
    { status: 200 }
  );
}
