// Styles & Components
import { Toaster } from '@/shared/components';
import { Navbar, SettingsContainer } from '../_components';

interface Props {
  children: React.ReactNode;
}

function SettingsLayout({ children }: Props): JSX.Element {
  return (
    <SettingsContainer>
      <Toaster />
      <Navbar />
      {children}
    </SettingsContainer>
  );
}
export default SettingsLayout;
