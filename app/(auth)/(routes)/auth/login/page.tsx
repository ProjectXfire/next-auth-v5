// Styles & Components
import { CardWrapper, LoginForm } from '@/app/(auth)/_components';

function LoginPage(): JSX.Element {
  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
      showSocial
    >
      <LoginForm />
    </CardWrapper>
  );
}
export default LoginPage;
