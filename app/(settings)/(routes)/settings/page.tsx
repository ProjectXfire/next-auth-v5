import { getCurrentSession } from '@/core/services/auth/server';
import { CloseSession } from '../../_components';

async function SettingsPage(): Promise<JSX.Element> {
  const session = await getCurrentSession();

  return (
    <div>
      {JSON.stringify(session, null, 2)} <CloseSession />
    </div>
  );
}
export default SettingsPage;
