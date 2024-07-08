import '@/__tests__/mock/prisma';
import { db } from '@/core/lib/db';
import { PrismaClient } from '@prisma/client';
import { getUserById } from '@/core/services/user/server/get-user.service';
import { testUser } from '@/__tests__/mock/services';

describe('Get user service', () => {
  test('should getUserById return null when occur un error', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.user.findUnique as jest.Mock).mockRejectedValue(null);
    const user = await getUserById(testUser.id);
    expect(user).toBeNull();
  });

  test('should getUserById return null when user not found', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);
    const user = await getUserById(testUser.id);
    expect(user).toBeNull();
  });

  test('should getUserById return user', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(testUser);
    const user = await getUserById(testUser.id);
    expect(user).toEqual(testUser);
  });
});
