import { getCurrentSession } from '@/core/services/auth/server';
// Styles & Components
import { UserCard } from '../../_components';
import { FormError } from '@/shared/components';

async function ServerPage(): Promise<JSX.Element> {
  const session = await getCurrentSession();

  if (!session) {
    return <FormError message='User not found, close session and sign in again.' />;
  }

  return (
    <section>
      <UserCard label='🖥️ Server component' user={session} />
    </section>
  );
}
export default ServerPage;
