// Styles & Components
import { Navbar, SettingsContainer } from '../_components';

interface Props {
  children: React.ReactNode;
}

function SettingsLayout({ children }: Props): JSX.Element {
  return (
    <SettingsContainer>
      <Navbar />
      {children}
    </SettingsContainer>
  );
}
export default SettingsLayout;
