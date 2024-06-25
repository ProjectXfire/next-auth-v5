import { generateToken } from '@/core/adapters';
import { db } from '@/core/lib';
import { getResetTokenByEmail } from './get-verification-token.service';
import { deleteResetToken } from './delete-reset-token.service';

export async function createResetToken(email: string) {
  try {
    const expires = new Date(new Date().getTime() + 300 * 1000);
    const token = generateToken();
    const existToken = await getResetTokenByEmail(email);
    if (existToken) {
      await deleteResetToken(existToken.id);
    }
    const resetToken = await db.passwordResetToken.create({
      data: { email, expires, token },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
}
