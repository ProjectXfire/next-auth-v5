import { confirmEmail } from '@/core/services/auth/client/confirm-email.service';

jest.mock('../../core/services/auth/client/register.service.ts', () => ({
  register: jest.fn(),
}));

jest.mock('../../core/services/auth/client/login.service.ts', () => ({
  login: jest.fn(),
}));

jest.mock('../../core/services/auth/client/validate-code.service.ts', () => ({
  validateCode: jest.fn(),
}));

jest.mock('../../core/services/auth/client/validate-token.service.ts', () => ({
  validateResetToken: jest.fn(),
}));

jest.mock('../../core/services/auth/client/reset-password.service.ts', () => ({
  resetPassword: jest.fn(),
  resetPasswordEmail: jest.fn(),
}));

jest.mock('../../core/services/auth/client/confirm-email.service.ts', () => ({
  confirmEmail: jest.fn(),
}));
