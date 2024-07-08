import { testErrorMessage, testSuccessMessage, testUser } from '@/__tests__/mock/services';
import { getUserById } from '@/core/services/user/client/get-user.service';

describe('Get user service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('should return success message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: testUser, success: testSuccessMessage, error: null }),
    });
    const { success, data } = await getUserById(testUser.id);
    expect(success).toBe(testSuccessMessage);
    expect(data).toEqual(testUser);
  });

  test('should return error message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ data: null, success: null, error: testErrorMessage }),
    });
    const { error } = await getUserById(testUser.id);
    expect(error).toBe(testErrorMessage);
  });
});
