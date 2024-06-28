import { getCurrentSession } from '@/core/services/auth/server';
// Styles & Components
import { FormError } from '@/shared/components';
import { AdminCard } from '../../_components';

async function AdminPage(): Promise<JSX.Element> {
  const session = await getCurrentSession();

  if (!session) {
    return <FormError message='User not found, close session and sign in again.' />;
  }

  return <AdminCard role={session.role} />;
}
export default AdminPage;
