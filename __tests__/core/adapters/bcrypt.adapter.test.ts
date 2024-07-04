import { hashPassword, checkPassword } from '@/core/adapters';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('Bcrypt Adapter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const returnPasswordHashed = 'transformed password';
  const password = 'password tested';
  const wrongPassword = 'wrong password';

  test('should return a string value when receive the password', () => {
    (bcrypt.hashSync as jest.Mock).mockReturnValue(returnPasswordHashed);
    const hashedPassword = hashPassword(password);
    expect(hashedPassword).toBe(returnPasswordHashed);
  });

  test('should return a null when an error occur', () => {
    (bcrypt.hashSync as jest.Mock).mockImplementation(() => {
      throw new Error('hashed failed');
    });
    const hashedPassword = hashPassword(password);
    expect(hashedPassword).toBeNull();
  });

  test('should return is valid when the password is correct', () => {
    (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
    const isValid = checkPassword(password, returnPasswordHashed);
    expect(isValid).toBeTruthy();
  });

  test('should return invalid when the password is incorrect', () => {
    (bcrypt.compareSync as jest.Mock).mockReturnValue(false);
    const isValid = checkPassword(wrongPassword, returnPasswordHashed);
    expect(isValid).toBeFalsy();
  });
});
