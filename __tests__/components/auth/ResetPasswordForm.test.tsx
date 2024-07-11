import '../../mock/auth';
import {
  testErrorMessage,
  testPassword,
  testSuccessMessage,
  testSuccessMessage2,
  testToken,
} from '@/__tests__/mock/services';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/app/(auth)/_components/forms/ResetPasswordForm';
import { validateResetToken } from '@/core/services/auth/client/validate-token.service';
import { resetPassword } from '@/core/services/auth/client/reset-password.service';

jest.mock('next/navigation', () => {
  const useSearchParamsMock = {
    get: jest.fn(),
  };
  return { useSearchParams: jest.fn(() => useSearchParamsMock) };
});

describe('Reset password form component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render error message when token is not in the url', async () => {
    const query = useSearchParams();
    (query.get as jest.Mock).mockReturnValue(null);
    render(<ResetPasswordForm />);
    const errorMessage = screen.getByText('Token not found');
    expect(errorMessage).toBeInTheDocument();
  });

  test('should render form when toke exist', async () => {
    const query = useSearchParams();
    (query.get as jest.Mock).mockReturnValue('my-validated-token');
    (validateResetToken as jest.Mock).mockResolvedValue({ error: null, success: null });
    render(<ResetPasswordForm />);
    await waitFor(() => {
      const passwordInput = screen.getByLabelText('password');
      const confirmPasswordInput = screen.getByLabelText('confirmPassword');
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
    });
  });

  test('should render error message when request fails', async () => {
    const query = useSearchParams();
    (query.get as jest.Mock).mockReturnValue('my-validated-token');
    (validateResetToken as jest.Mock).mockResolvedValue({ error: testErrorMessage, success: null });
    render(<ResetPasswordForm />);
    await waitFor(() => {
      const errorMessage = screen.getByText(testErrorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('should render success message when token is validated', async () => {
    const query = useSearchParams();
    (query.get as jest.Mock).mockReturnValue('my-validated-token');
    (validateResetToken as jest.Mock).mockResolvedValue({
      error: null,
      success: testSuccessMessage,
    });
    render(<ResetPasswordForm />);
    await waitFor(() => {
      const successMessage = screen.getByText(testSuccessMessage);
      expect(successMessage).toBeInTheDocument();
    });
  });

  test('should render error message when submit and the request fails', async () => {
    const query = useSearchParams();
    (query.get as jest.Mock).mockReturnValue('my-validated-token');
    (validateResetToken as jest.Mock).mockResolvedValue({
      error: null,
      success: testSuccessMessage,
    });
    render(<ResetPasswordForm />);
    await waitFor(async () => {
      (validateResetToken as jest.Mock).mockResolvedValue({
        error: testErrorMessage,
        success: null,
      });
      const passwordInput = screen.getByLabelText('password');
      const confirmPasswordInput = screen.getByLabelText('confirmPassword');
      const submit = screen.getByLabelText('submit');
      fireEvent.change(passwordInput, { target: { value: testPassword } });
      fireEvent.change(confirmPasswordInput, { target: { value: testPassword } });
      fireEvent.click(submit);
      await waitFor(() => {
        const errorMessage = screen.getByText(testErrorMessage);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  test('should render error message when reset password fails, token is valid', async () => {
    const query = useSearchParams();
    (query.get as jest.Mock).mockReturnValue('my-validated-token');
    (validateResetToken as jest.Mock).mockResolvedValue({
      error: null,
      success: testSuccessMessage,
      data: testToken,
    });
    render(<ResetPasswordForm />);
    await waitFor(() => {});
    (resetPassword as jest.Mock).mockResolvedValue({
      error: testErrorMessage,
      success: null,
      data: null,
    });

    const passwordInput = screen.getByLabelText('password');
    const confirmPasswordInput = screen.getByLabelText('confirmPassword');
    const submit = screen.getByLabelText('submit');
    fireEvent.change(passwordInput, { target: { value: testPassword } });
    fireEvent.change(confirmPasswordInput, { target: { value: testPassword } });
    fireEvent.click(submit);
    await waitFor(() => {
      const errorMessage = screen.getByText(testErrorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('should render success message when password has changed', async () => {
    const query = useSearchParams();
    (query.get as jest.Mock).mockReturnValue('my-validated-token');
    (validateResetToken as jest.Mock).mockResolvedValue({
      error: null,
      success: testSuccessMessage,
      data: testToken,
    });
    render(<ResetPasswordForm />);
    await waitFor(() => {});
    (resetPassword as jest.Mock).mockResolvedValue({
      error: null,
      success: testSuccessMessage2,
      data: null,
    });
    const passwordInput = screen.getByLabelText('password');
    const confirmPasswordInput = screen.getByLabelText('confirmPassword');
    const submit = screen.getByLabelText('submit');
    fireEvent.change(passwordInput, { target: { value: testPassword } });
    fireEvent.change(confirmPasswordInput, { target: { value: testPassword } });
    fireEvent.click(submit);
    await waitFor(() => {
      const sucessMessage = screen.getByText(testSuccessMessage2);
      expect(sucessMessage).toBeInTheDocument();
    });
  });
});
