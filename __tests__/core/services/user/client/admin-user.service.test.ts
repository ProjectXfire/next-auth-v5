import { testErrorMessage, testSuccessMessage } from '@/__tests__/mock/services';
import { testAdminRole } from '@/core/services/user/client/admin-user.service';

describe('Admin user service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('should return success message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: null, success: testSuccessMessage, error: null }),
    });
    const { success } = await testAdminRole();
    expect(success).toBe(testSuccessMessage);
  });

  test('should return error message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ data: null, success: null, error: testErrorMessage }),
    });
    const { error } = await testAdminRole();
    expect(error).toBe(testErrorMessage);
  });
});
