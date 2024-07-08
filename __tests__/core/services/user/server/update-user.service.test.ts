import '@/__tests__/mock/prisma';
import { db } from '@/core/lib/db';
import { PrismaClient } from '@prisma/client';
import { testUser } from '@/__tests__/mock/services';
import { updateEmailVerified } from '@/core/services/user/server/update-user.service';

describe('Update user service', () => {
  test('should updateEmailVerified return null when occur un error', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.user.update as jest.Mock).mockRejectedValue(null);
    const user = await updateEmailVerified(testUser.id);
    expect(user).toBeFalsy();
  });

  test('should updateEmailVerified return user', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.user.update as jest.Mock).mockResolvedValue(true);
    const user = await updateEmailVerified(testUser.id);
    expect(user).toBeTruthy();
  });
});
