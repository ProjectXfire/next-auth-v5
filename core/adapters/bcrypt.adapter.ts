import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string): string | null {
  try {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    return null;
  }
}

export function checkPassword(password: string, hashedPassword: string): boolean {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    return false;
  }
}
