import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string): string | null {
  try {
    if (!password) return null;
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    return null;
  }
}

export function checkPassword(password: string, hashedPassword: string): boolean {
  try {
    if (!password || !hashedPassword) return false;
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    return false;
  }
}
