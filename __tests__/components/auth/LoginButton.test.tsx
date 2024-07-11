import { render, fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginButton from '@/app/(auth)/_components/buttons/LoginButton';

jest.mock('next/navigation', () => {
  const useRouterMock = {
    push: jest.fn(),
  };
  return { useRouter: jest.fn(() => useRouterMock) };
});

describe('Login button component', () => {
  const text = 'text';

  beforeEach(() => {
    render(
      <LoginButton>
        <p>{text}</p>
      </LoginButton>
    );
  });

  test('should render the component', () => {
    const p = screen.getByText(text);
    expect(p).toBeTruthy();
  });

  test('should call router.push on click', () => {
    const router = useRouter();
    const spanButton = screen.getByLabelText('main-button');
    fireEvent.click(spanButton);

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith('/auth/login');
  });
});
