'use client';

import { Button } from '@/shared/components';
import { signOut } from 'next-auth/react';

function CloseSession(): JSX.Element {
  return (
    <Button
      size='sm'
      variant='destructive'
      className='w-full'
      type='button'
      name='signout'
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
}
export default CloseSession;
