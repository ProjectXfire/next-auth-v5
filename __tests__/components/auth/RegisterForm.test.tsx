import '../../mock/auth';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import RegisterForm from '@/app/(auth)/_components/forms/RegisterForm';
import { register } from '@/core/services/auth/client/register.service';
import { testErrorMessage, testSuccessMessage, userCreatePayload } from '@/__tests__/mock/services';

describe('Register form component', () => {
  const { name, email, password } = userCreatePayload;

  beforeEach(() => {
    jest.clearAllMocks();
    render(<RegisterForm />);
  });

  test('should render the component', () => {
    const nameText = screen.getByText('Name');
    const emailText = screen.getByText('Email');
    const passwordText = screen.getByText('Password');
    expect(nameText).toBeTruthy();
    expect(emailText).toBeTruthy();
    expect(passwordText).toBeTruthy();
  });

  test('should call register when submit', async () => {
    (register as jest.Mock).mockResolvedValue({ data: null, error: null, success: null });
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByLabelText('register');
    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(register).toHaveBeenCalledTimes(1);
      expect(register).toHaveBeenCalledWith({ email, password, name });
    });
  });

  test('should show a error message when the request fails', async () => {
    (register as jest.Mock).mockResolvedValue({
      data: null,
      error: testErrorMessage,
      success: null,
    });
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByLabelText('register');
    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      const errorMessage = screen.getByText(testErrorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('should show a success message when the request fails', async () => {
    (register as jest.Mock).mockResolvedValue({
      data: null,
      error: null,
      success: testSuccessMessage,
    });
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByLabelText('register');
    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      const successMessage = screen.getByText(testSuccessMessage);
      expect(successMessage).toBeInTheDocument();
    });
  });
});
