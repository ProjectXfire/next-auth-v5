import { testErrorMessage, testSuccessMessage, testUser } from '@/__tests__/mock/services';
import { confirmEmail } from '@/core/services/auth/client/confirm-email.service';

describe('Confirm email service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('should return a success message when all is ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: testUser, success: testSuccessMessage, error: null }),
    });
    const { data, error, success } = await confirmEmail('token');
    expect(data).toEqual(testUser);
    expect(success).toBe(testSuccessMessage);
    expect(error).toBeNull();
  });

  test('should return a error message when failed the call', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ data: null, success: null, error: testErrorMessage }),
    });
    const { data, error, success } = await confirmEmail('token');
    expect(data).toBeNull();
    expect(success).toBeNull();
    expect(error).toBe(testErrorMessage);
  });
});
