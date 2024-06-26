// Styles & Components
import { CardWrapper, ResetPasswordForm } from '@/app/(auth)/_components';

function ResetPasswordPage(): JSX.Element {
  return (
    <CardWrapper
      headerLabel='Choose new password'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <ResetPasswordForm />
    </CardWrapper>
  );
}
export default ResetPasswordPage;
