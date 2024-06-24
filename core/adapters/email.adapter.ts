import { Resend } from 'resend';
import { envs } from '@/shared/constants';

const resend = new Resend(envs.resendApiKey);

export async function sendVerificationEmail(email: string, token: string) {
  try {
    const confirmLink = `${envs.webUrl}/auth/new-verification?token=${token}`;
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Confirm your email',
      html: `<p>Click <a href="${confirmLink}">here</a></p>`,
    });
    return true;
  } catch (error) {
    return false;
  }
}
