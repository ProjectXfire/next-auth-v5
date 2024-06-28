'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
// Styles & Components
import styles from './Navbar.module.css';
import { Button } from '@/shared/components';
import { UserButton } from '..';

function Navbar(): JSX.Element {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar__left-actions']}>
        <Button size='sm' variant={pathname === '/server' ? 'default' : 'outline'} asChild>
          <NextLink href='/server'>Server</NextLink>
        </Button>
        <Button size='sm' variant={pathname === '/client' ? 'default' : 'outline'} asChild>
          <NextLink href='/client'>Client</NextLink>
        </Button>
        <Button size='sm' variant={pathname === '/admin' ? 'default' : 'outline'} asChild>
          <NextLink href='/admin'>Admin</NextLink>
        </Button>
        <Button size='sm' variant={pathname === '/settings' ? 'default' : 'outline'} asChild>
          <NextLink href='/settings'>Settings</NextLink>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
}
export default Navbar;
