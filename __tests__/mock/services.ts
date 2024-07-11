import type { UpdateUserDto } from '@/core/dtos/user';
import type { UserEntity } from '@/core/entities/user';

export const testUser: UserEntity = {
  id: 'testid',
  name: 'test-name',
  email: 'test@test.com',
  emailVerified: null,
  image: 'test-image',
  role: 'USER',
  isTwoFactorEnabled: false,
  isOauth: false,
};

export const testUserAdmin: UserEntity = {
  id: 'testid',
  name: 'test-name',
  email: 'test@test.com',
  emailVerified: null,
  image: 'test-image',
  role: 'ADMIN',
  isTwoFactorEnabled: false,
  isOauth: false,
};

export const testPassword = 'Testpassword1$';
export const testEmail = 'test@test.com';

export const userPayload = { email: 'test@test.com', password: testPassword };

export const updateUserPayload: UpdateUserDto = {
  name: testUser.name,
  isTwoFactorEnabled: testUser.isTwoFactorEnabled,
  role: testUser.role,
  password: testPassword,
};

export const userCreatePayload = { ...userPayload, name: 'test' };

export const testSuccessMessage = 'Success request';
export const testSuccessMessage2 = 'Success request 2';
export const testErrorMessage = 'Something went wrong';
export const internalError = 'Internal error server';

export const testToken = {
  id: 'testid',
  email: 'test@test.com',
  token: 'test-token',
  expires: '2024-10-10',
};
