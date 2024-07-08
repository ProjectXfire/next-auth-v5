import '@/__tests__/mock/prisma';
import { internalError, testToken } from '@/__tests__/mock/services';
import { db } from '@/core/lib';
import { PrismaClient } from '@prisma/client';
import {
  deleteResetToken,
  deleteTwoFactorToken,
  deleteVerificationToken,
} from '@/core/services/auth/server/delete-token.service';

describe('Delete token service', () => {
  test('should deleteVerificationToken return true', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.verificationToken.delete as jest.Mock).mockReturnValue(null);
    const result = await deleteVerificationToken(testToken.id);
    expect(result).toBeTruthy();
  });
  test('should deleteVerificationToken throw an error', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.verificationToken.delete as jest.Mock).mockRejectedValue(null);
    try {
      await deleteVerificationToken(testToken.id);
      expect(true).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toBe(internalError);
    }
  });

  test('should deleteResetToken return true', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.passwordResetToken.delete as jest.Mock).mockReturnValue(null);
    const result = await deleteResetToken(testToken.id);
    expect(result).toBeTruthy();
  });
  test('should deleteResetToken throw an error', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.passwordResetToken.delete as jest.Mock).mockRejectedValue(null);
    try {
      await deleteResetToken(testToken.id);
      expect(true).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toBe(internalError);
    }
  });

  test('should deleteTwoFactorToken return true', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.twoFactorToken.delete as jest.Mock).mockReturnValue(null);
    const result = await deleteTwoFactorToken(testToken.id);
    expect(result).toBeTruthy();
  });
  test('should deleteTwoFactorToken throw an error', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.twoFactorToken.delete as jest.Mock).mockRejectedValue(null);
    try {
      await deleteTwoFactorToken(testToken.id);
      expect(true).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toBe(internalError);
    }
  });
});
