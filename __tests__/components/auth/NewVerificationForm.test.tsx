import '../../mock/auth';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { confirmEmail } from '@/core/services/auth/client/confirm-email.service';
import NewVerificationForm from '@/app/(auth)/_components/forms/NewVerificationForm';
import { testErrorMessage, testSuccessMessage } from '@/__tests__/mock/services';

jest.mock('next/navigation', () => {
  const useSearchParamsMock = {
    get: jest.fn(),
  };
  return { useSearchParams: jest.fn(() => useSearchParamsMock) };
});

describe('New verification form component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render error message when token is not in the url', () => {
    const query = useSearchParams();
    (query.get as jest.Mock).mockReturnValue(null);
    render(<NewVerificationForm />);
    const errorMessage = screen.getByText('Missing token!');
    expect(errorMessage).toBeInTheDocument();
  });

  test('should render error message when token is ok but the request fails', async () => {
    const query = useSearchParams();
    (query.get as jest.Mock).mockReturnValue('my-token');
    (confirmEmail as jest.Mock).mockResolvedValue({ error: testErrorMessage, success: null });
    render(<NewVerificationForm />);
    await waitFor(() => {
      const errorMessage = screen.getByText(testErrorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('should render success message when token is ok and request too', async () => {
    const query = useSearchParams();
    (query.get as jest.Mock).mockReturnValue('my-token');
    (confirmEmail as jest.Mock).mockResolvedValue({ error: null, success: testSuccessMessage });
    render(<NewVerificationForm />);
    await waitFor(() => {
      const successMessage = screen.getByText(testSuccessMessage);
      expect(successMessage).toBeInTheDocument();
    });
  });
});
