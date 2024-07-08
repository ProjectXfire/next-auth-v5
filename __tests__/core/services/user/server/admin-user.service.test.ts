import { testUser, testUserAdmin } from '@/__tests__/mock/services';
import { getCurrentSession } from '@/core/services/auth/server/auth.service';
import { testAdminRoleServer } from '@/core/services/user/server/admin-user.service';

jest.mock('../../../../../core/services/auth/server/auth.service.ts', () => ({
  getCurrentSession: jest.fn(),
}));

describe('Admin user service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should return error when user is no logged', async () => {
    (getCurrentSession as jest.Mock).mockResolvedValue(null);
    const { error } = await testAdminRoleServer();
    expect(error).toBe('Session not found - Server Action');
  });

  test('should return error when user is not an admin', async () => {
    (getCurrentSession as jest.Mock).mockResolvedValue(testUser);
    const { error } = await testAdminRoleServer();
    expect(error).toBe('Unauthorized access! - Server Action');
  });

  test('should return success when user is logged and is an admin', async () => {
    (getCurrentSession as jest.Mock).mockResolvedValue(testUserAdmin);
    const { success } = await testAdminRoleServer();
    expect(success).toBe('Admin User - Authorized - Server Action');
  });
});
