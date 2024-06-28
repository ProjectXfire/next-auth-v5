import { SessionProvider } from 'next-auth/react';
// Styles & Components
import styles from './Container.module.css';

interface Props {
  children: React.ReactNode;
}

function SettingsContainer({ children }: Props): JSX.Element {
  return (
    <SessionProvider>
      <main className={styles['settings-container']}>{children}</main>
    </SessionProvider>
  );
}
export default SettingsContainer;
