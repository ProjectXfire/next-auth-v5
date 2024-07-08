jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    verificationToken: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    passwordResetToken: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    twoFactorToken: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    account: {
      findFirst: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

describe('mock', () => {
  test('test mock', () => {});
});
