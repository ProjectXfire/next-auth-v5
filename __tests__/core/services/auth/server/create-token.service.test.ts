import '@/__tests__/mock/prisma';
import { PrismaClient } from '@prisma/client';
import { db } from '@/core/lib';
import { testToken, testUser } from '@/__tests__/mock/services';
import { createVerificationToken } from '@/core/services/auth/server/create-token.service';
import { getVerificationTokenByEmail } from '@/core/services/auth/server/get-token.service';
import { deleteVerificationToken } from '@/core/services/auth/server/delete-token.service';

jest.mock('../../../../../core/services/auth/server/get-token.service.ts');
jest.mock('../../../../../core/adapters/token.adapter.ts');
jest.mock('../../../../../core/services/auth/server/delete-token.service');

describe('Create token service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should createVerificationToken return a token', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (getVerificationTokenByEmail as jest.Mock).mockResolvedValue(testToken);
    (deleteVerificationToken as jest.Mock).mockResolvedValue(true);
    (prismaMock.verificationToken.create as jest.Mock).mockResolvedValue(testToken);
    const token = await createVerificationToken(testUser.email);
    expect(deleteVerificationToken).toHaveBeenCalledTimes(1);
    expect(deleteVerificationToken).toHaveBeenCalledWith(testToken.id);
    expect(token).toEqual(testToken);
  });

  test('should createVerificationToken not call deleteVerificationToken when getVerificationTokenByEmail return null', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (getVerificationTokenByEmail as jest.Mock).mockResolvedValue(null);
    (deleteVerificationToken as jest.Mock).mockResolvedValue(true);
    (prismaMock.verificationToken.create as jest.Mock).mockResolvedValue(testToken);
    const token = await createVerificationToken(testUser.email);
    expect(deleteVerificationToken).toHaveBeenCalledTimes(0);
    expect(token).toEqual(testToken);
  });

  test('should createVerificationToken return null when getVerificationTokenByEmail fails', async () => {
    (getVerificationTokenByEmail as jest.Mock).mockRejectedValue(null);
    const token = await createVerificationToken(testUser.email);
    expect(token).toBeNull();
  });

  test('should createVerificationToken return null when deleteVerificationToken fails', async () => {
    (getVerificationTokenByEmail as jest.Mock).mockRejectedValue(testToken);
    (deleteVerificationToken as jest.Mock).mockRejectedValue(null);
    const token = await createVerificationToken(testUser.email);
    expect(token).toBeNull();
  });

  test('should createVerificationToken return null when create token fails', async () => {
    (getVerificationTokenByEmail as jest.Mock).mockReturnValue(null);
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.verificationToken.create as jest.Mock).mockRejectedValue(null);
    const token = await createVerificationToken(testUser.email);
    expect(token).toBeNull();
  });
});
