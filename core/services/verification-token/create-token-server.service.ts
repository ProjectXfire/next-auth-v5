import { generateToken } from '@/core/adapters';
import { db } from '@/core/lib';
import { getVerificationTokenByEmail } from './get-verification-token-server.service';
import { deleteVerificationToken } from './delete-token-server.service';

export async function createVerificationToken(email: string) {
  try {
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const token = generateToken();
    const existToken = await getVerificationTokenByEmail(email);
    if (existToken) {
      await deleteVerificationToken(existToken.id);
    }
    const verificationToken = await db.verificationToken.create({
      data: { email, expires, token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
}
