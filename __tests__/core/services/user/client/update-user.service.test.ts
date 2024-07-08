import {
  testErrorMessage,
  testSuccessMessage,
  testUser,
  updateUserPayload,
} from '@/__tests__/mock/services';
import { updateUser } from '@/core/services/user/client/update-user.service';

describe('Update user service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('should return success message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: testUser, success: testSuccessMessage, error: null }),
    });
    const { success, data } = await updateUser(testUser.id, updateUserPayload);
    expect(success).toBe(testSuccessMessage);
    expect(data).toEqual(testUser);
  });

  test('should return error message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ data: null, success: null, error: testErrorMessage }),
    });
    const { error } = await updateUser(testUser.id, updateUserPayload);
    expect(error).toBe(testErrorMessage);
  });
});
