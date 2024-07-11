import '../../mock/auth';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { login } from '@/core/services/auth/client/login.service';
import LoginForm from '@/app/(auth)/_components/forms/LoginForm';
import { testErrorMessage, testUser, userPayload } from '@/__tests__/mock/services';
import { TF_TOKEN } from '@/shared/constants/token';
import { useCode } from '@/core/states/auth';

jest.mock('next/navigation', () => {
  const useSearchParamsMock = {
    get: jest.fn(),
  };
  return { useSearchParams: jest.fn(() => useSearchParamsMock) };
});

describe('Login form component', () => {
  const { email, password } = userPayload;

  beforeEach(() => {
    jest.clearAllMocks();
    const store = useCode.getState();
    store.close();
    render(<LoginForm />);
  });

  test('should LoginForm render', () => {
    const emailText = screen.getByText('Email');
    const passwordText = screen.getByText('Password');
    expect(emailText).toBeTruthy();
    expect(passwordText).toBeTruthy();
  });

  test('should call login when submit', async () => {
    (login as jest.Mock).mockResolvedValue({ data: null, error: null, success: null });
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1);
      expect(login).toHaveBeenCalledWith({ email, password });
    });
  });

  test(`should open the Code Component when the two factor auth is activated and the response is ok`, async () => {
    (login as jest.Mock).mockResolvedValue({ data: testUser, error: null, success: TF_TOKEN });
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      const textInCodeComponent = screen.getByText('Please check your email and put the code sent');
      expect(textInCodeComponent).toBeInTheDocument();
    });
  });

  test('should not open the Code Component then the two factor auth is desactivated and the response is ok', async () => {
    (login as jest.Mock).mockResolvedValue({ data: testUser, error: null, success: 'ok' });
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      const textInCodeComponent = screen.queryByText(
        'Please check your email and put the code sent'
      );
      expect(textInCodeComponent).not.toBeInTheDocument();
    });
  });

  test('should return error when the login fails', async () => {
    (login as jest.Mock).mockResolvedValue({ data: null, error: testErrorMessage, success: null });
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);
    await waitFor(() => {});
  });
});
