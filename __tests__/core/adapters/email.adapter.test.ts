import nodemailer from 'nodemailer';
import { emailService, sendVerificationEmail } from '@/core/adapters';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Email Adapter', () => {
  const email = 'test@test.com';
  const token = 'user-token-test';

  test('should return true if the email was sent', async () => {
    emailService.sendMail = jest.fn().mockReturnValue(true);
    const result = await sendVerificationEmail(email, token);
    expect(emailService.sendMail).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  test('should return false if the email was not sent', async () => {
    emailService.sendMail = jest.fn().mockRejectedValue(undefined);
    const result = await sendVerificationEmail(email, token);
    expect(emailService.sendMail).toHaveBeenCalled();
    expect(result).toBeFalsy();
  });

  test('should return false if the token or email are empties', async () => {
    const result1 = await sendVerificationEmail('', token);
    expect(result1).toBeFalsy();
    const result2 = await sendVerificationEmail(email, '');
    expect(result2).toBeFalsy();
    const result3 = await sendVerificationEmail('', '');
    expect(emailService.sendMail).toHaveBeenCalledTimes(0);
    expect(result3).toBeFalsy();
  });
});
