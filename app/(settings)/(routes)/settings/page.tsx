import { getCurrentSession } from '@/core/services/auth/server';
// Styles & Components
import { FormError } from '@/shared/components';
import { SettingsCard } from '../../_components';

async function SettingsPage(): Promise<JSX.Element> {
  const session = await getCurrentSession();

  if (!session) {
    return <FormError message='User not found, close session and sign in again.' />;
  }

  return <SettingsCard user={session} />;
}
export default SettingsPage;
