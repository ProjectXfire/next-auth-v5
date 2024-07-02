'use client';

import { useRouter } from 'next/navigation';
// Styles & Components
import styles from './Buttons.module.css';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components';
import { CardWrapper, LoginForm } from '..';

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

  if (mode === 'modal')
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className='max-w-[500px] p-0'>
          <CardWrapper
            headerLabel='Welcome back'
            backButtonLabel="Don't have an account?"
            backButtonHref='/auth/register'
            showSocial
          >
            <LoginForm />
          </CardWrapper>
        </DialogContent>
      </Dialog>
    );

  return (
    <span className={styles['login-button']} onClick={onClick}>
      {children}
    </span>
  );
}
export default LoginButton;
