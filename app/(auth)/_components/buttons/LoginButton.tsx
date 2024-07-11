'use client';

import { useRouter } from 'next/navigation';
// Styles & Components
import styles from './Buttons.module.css';

interface Props {
  children: React.ReactNode;
}

function LoginButton({ children }: Props): JSX.Element {
  const router = useRouter();

  const onClick = (): void => {
    router.push('/auth/login');
  };

  return (
    <span aria-label='main-button' className={styles['login-button']} onClick={onClick}>
      {children}
    </span>
  );
}
export default LoginButton;
