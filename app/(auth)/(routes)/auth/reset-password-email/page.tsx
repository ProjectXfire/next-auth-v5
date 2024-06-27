// Styles & Components
import { CardWrapper, ResetForm } from '@/app/(auth)/_components';

function ResetPasswordEmailPage() {
  return (
    <CardWrapper
      headerLabel='Restore your password'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <ResetForm />
    </CardWrapper>
  );
}
export default ResetPasswordEmailPage;
