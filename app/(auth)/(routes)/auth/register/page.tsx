// Styles & Components
import { CardWrapper, RegisterForm } from '@/app/(auth)/_components';

function RegisterPage(): JSX.Element {
  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel='If you have an account click here'
      backButtonHref='/auth/login'
      showSocial
    >
      <RegisterForm />
    </CardWrapper>
  );
}
export default RegisterPage;
