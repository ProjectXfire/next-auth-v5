import '../../mock/auth';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import ResetForm from '@/app/(auth)/_components/forms/ResetForm';
import { testEmail, testErrorMessage, testSuccessMessage } from '@/__tests__/mock/services';
import { resetPasswordEmail } from '@/core/services/auth/client/reset-password.service';

describe('Reset form component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<ResetForm />);
  });

  test('should render the component', () => {
    const emailInput = screen.getByLabelText('email');
    expect(emailInput).toBeInTheDocument();
  });

  test('should call resetPasswordEmail when submit', async () => {
    (resetPasswordEmail as jest.Mock).mockResolvedValue({
      error: null,
      success: null,
    });
    const emailInput = screen.getByLabelText('email');
    const submit = screen.getByLabelText('submit');
    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.click(submit);
    await waitFor(() => {
      expect(resetPasswordEmail).toHaveBeenCalledTimes(1);
      expect(resetPasswordEmail).toHaveBeenCalledWith({ email: testEmail });
    });
  });

  test('should render error message when request fails', async () => {
    (resetPasswordEmail as jest.Mock).mockResolvedValue({
      error: testErrorMessage,
      success: null,
    });
    const emailInput = screen.getByLabelText('email');
    const submit = screen.getByLabelText('submit');
    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.click(submit);
    await waitFor(() => {
      const errorMessage = screen.getByText(testErrorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('should render success message when all is ok', async () => {
    (resetPasswordEmail as jest.Mock).mockResolvedValue({
      error: null,
      success: testSuccessMessage,
    });
    const emailInput = screen.getByLabelText('email');
    const submit = screen.getByLabelText('submit');
    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.click(submit);
    await waitFor(() => {
      const successMessage = screen.getByText(testSuccessMessage);
      expect(successMessage).toBeInTheDocument();
    });
  });
});
