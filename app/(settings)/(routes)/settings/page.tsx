import { getCurrentSession } from '@/core/services/auth';
import { CloseSession } from '../../_components';

async function SettingsPage(): Promise<JSX.Element> {
  const session = await getCurrentSession();

  return (
    <div>
      {JSON.stringify(session)} <CloseSession />
    </div>
  );
}
export default SettingsPage;
