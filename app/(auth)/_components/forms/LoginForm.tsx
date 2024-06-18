// Styles & Components
import styles from './Forms.module.css';
import { CardWrapper } from '..';

function LoginForm(): JSX.Element {
  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
}
export default LoginForm;
