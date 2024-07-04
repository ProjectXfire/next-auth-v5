import nodemailer from 'nodemailer';
import { envs } from '@/shared/constants';

export const emailService = nodemailer.createTransport({
  service: envs.mailerService,
  auth: {
    user: envs.mailerEmail,
    pass: envs.mailerSecret,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  try {
    if (!email || !token) return false;
    const confirmLink = `${envs.webUrl}/auth/new-verification?token=${token}`;
    await emailService.sendMail({
      to: email,
      subject: 'Confirm your email',
      html: `<p>Click <a href="${confirmLink}">here</a></p>`,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function sendResetPasswordEmail(email: string, token: string) {
  try {
    if (!email || !token) return false;
    const resetPasswordLink = `${envs.webUrl}/auth/reset-password?token=${token}`;
    await emailService.sendMail({
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetPasswordLink}">here</a> to reset password</p>`,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function sendTwoFactorEmail(email: string, token: string) {
  try {
    if (!email || !token) return false;
    await emailService.sendMail({
      to: email,
      subject: 'Two Authentication Code',
      html: `<p>Your code: ${token}</p>`,
    });
    return true;
  } catch (error) {
    return false;
  }
}
