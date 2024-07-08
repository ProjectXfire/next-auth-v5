import '@/__tests__/mock/prisma';
import { PrismaClient } from '@prisma/client';
import { db } from '@/core/lib';
import {
  getResetTokenByEmail,
  getResetTokenByToken,
  getTwoFactorTokenByEmail,
  getTwoFactorTokenByToken,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from '@/core/services/auth/server/get-token.service';
import { internalError, testToken, testUser } from '@/__tests__/mock/services';

describe('Get token service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should getVerificationTokenByEmail return token', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.verificationToken.findFirst as jest.Mock).mockReturnValue(testToken);
    const token = await getVerificationTokenByEmail(testUser.email);
    expect(token).toEqual(testToken);
  });
  test('should getVerificationTokenByEmail return null when token not exist', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.verificationToken.findFirst as jest.Mock).mockReturnValue(null);
    const token = await getVerificationTokenByEmail(testUser.email);
    expect(token).toEqual(null);
  });
  test('should getVerificationTokenByEmail return error when findFirst fails', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.verificationToken.findFirst as jest.Mock).mockRejectedValue(null);
    try {
      await getVerificationTokenByEmail(testUser.email);
      expect(true).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toBe(internalError);
    }
  });

  test('should getVerificationTokenByToken return token', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.verificationToken.findUnique as jest.Mock).mockReturnValue(testToken);
    const token = await getVerificationTokenByToken(testToken.token);
    expect(token).toEqual(testToken);
  });
  test('should getVerificationTokenByToken return null when token not exist', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.verificationToken.findUnique as jest.Mock).mockReturnValue(null);
    const token = await getVerificationTokenByToken(testUser.email);
    expect(token).toEqual(null);
  });
  test('should getVerificationTokenByToken return error when findFirst fails', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.verificationToken.findUnique as jest.Mock).mockRejectedValue(null);
    try {
      await getVerificationTokenByToken(testUser.email);
      expect(true).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toBe(internalError);
    }
  });

  test('should getResetTokenByEmail return token', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.passwordResetToken.findFirst as jest.Mock).mockReturnValue(testToken);
    const token = await getResetTokenByEmail(testToken.email);
    expect(token).toEqual(testToken);
  });
  test('should getResetTokenByEmail return null when token not exist', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.passwordResetToken.findFirst as jest.Mock).mockReturnValue(null);
    const token = await getResetTokenByEmail(testToken.email);
    expect(token).toEqual(null);
  });
  test('should getResetTokenByEmail return null when token not exist', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.passwordResetToken.findFirst as jest.Mock).mockRejectedValue(null);
    try {
      await getResetTokenByEmail(testToken.email);
      expect(true).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toBe(internalError);
    }
  });

  test('should getResetTokenByToken return token', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.passwordResetToken.findUnique as jest.Mock).mockReturnValue(testToken);
    const token = await getResetTokenByToken(testToken.token);
    expect(token).toEqual(testToken);
  });
  test('should getResetTokenByToken return null when token not exist', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.passwordResetToken.findUnique as jest.Mock).mockReturnValue(null);
    const token = await getResetTokenByToken(testToken.token);
    expect(token).toEqual(null);
  });
  test('should getResetTokenByToken return null when token not exist', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.passwordResetToken.findUnique as jest.Mock).mockRejectedValue(null);
    try {
      await getResetTokenByToken(testToken.token);
      expect(true).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toBe(internalError);
    }
  });

  test('should getTwoFactorTokenByEmail return token', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.twoFactorToken.findFirst as jest.Mock).mockReturnValue(testToken);
    const token = await getTwoFactorTokenByEmail(testToken.email);
    expect(token).toEqual(testToken);
  });
  test('should getTwoFactorTokenByEmail return null when token not exist', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.twoFactorToken.findFirst as jest.Mock).mockReturnValue(null);
    const token = await getTwoFactorTokenByEmail(testToken.email);
    expect(token).toEqual(null);
  });
  test('should getTwoFactorTokenByEmail return null when token not exist', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.twoFactorToken.findFirst as jest.Mock).mockRejectedValue(null);
    try {
      await getTwoFactorTokenByEmail(testToken.email);
      expect(true).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toBe(internalError);
    }
  });

  test('should getTwoFactorTokenByToken return token', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.twoFactorToken.findUnique as jest.Mock).mockReturnValue(testToken);
    const token = await getTwoFactorTokenByToken(testToken.token);
    expect(token).toEqual(testToken);
  });
  test('should getTwoFactorTokenByToken return null when token not exist', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.twoFactorToken.findUnique as jest.Mock).mockReturnValue(null);
    const token = await getTwoFactorTokenByToken(testToken.token);
    expect(token).toEqual(null);
  });
  test('should getTwoFactorTokenByToken return null when token not exist', async () => {
    const prismaMock = db as jest.Mocked<PrismaClient>;
    (prismaMock.twoFactorToken.findUnique as jest.Mock).mockRejectedValue(null);
    try {
      await getTwoFactorTokenByToken(testToken.email);
      expect(true).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toBe(internalError);
    }
  });
});
