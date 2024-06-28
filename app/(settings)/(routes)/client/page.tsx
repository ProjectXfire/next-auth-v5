'use client';

import { useCurrentSession } from '../../_hooks';
// Styles & Components
import { FormError } from '@/shared/components';
import { UserCard } from '../../_components';

function ClientPage() {
  const session = useCurrentSession();

  if (!session) {
    return <FormError message='User not found, close session and sign in again.' />;
  }

  return (
    <section>
      <UserCard label='📱 Client component' user={session} />
    </section>
  );
}
export default ClientPage;
