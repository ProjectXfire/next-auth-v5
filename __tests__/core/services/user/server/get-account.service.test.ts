import '@/__tests__/mock/prisma';
import { testUser } from '@/__tests__/mock/services';
import { db } from '@/core/lib/db';
import { PrismaClient } from '@prisma/client';
import { getAccountByUserId } from '@/core/services/user/server/get-account.service';

describe('Get account service', () => {
  test('should getAccountByUserId return null when occur an error', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.account.findFirst as jest.Mock).mockRejectedValue(null);
    const account = await getAccountByUserId(testUser.id);
    expect(account).toBeNull();
  });

  test('should getAccountByUserId return an account', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.account.findFirst as jest.Mock).mockResolvedValue(testUser);
    const account = await getAccountByUserId(testUser.id);
    expect(account).toEqual(testUser);
  });
});
