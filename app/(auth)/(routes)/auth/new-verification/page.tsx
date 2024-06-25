// Styles & Components
import { CardWrapper, NewVerificationForm } from '@/app/(auth)/_components';

function NewVerificationPage() {
  return (
    <CardWrapper
      headerLabel='Confirming your verification'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      <NewVerificationForm />
    </CardWrapper>
  );
}
export default NewVerificationPage;
