'use client';

import { useRouter } from 'next/navigation';
// Styles & Components
import styles from './LoginButton.module.css';

interface Props {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

function LoginButton({ children, mode = 'redirect', asChild }: Props): JSX.Element {
  const router = useRouter();

  const onClick = (): void => {
    router.push('/auth/login');
  };

  if (mode === 'modal') return <span>Modal</span>;

  return (
    <span className={styles['login-button']} onClick={onClick}>
      {children}
    </span>
  );
}
export default LoginButton;
