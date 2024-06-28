'use client';

// Services
import { useCurrentSession } from '../../_hooks';
// Styles & Components
import styles from './Button.module.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/shared/components';
import { User } from 'lucide-react';
import { CloseSession } from '..';

function UserButton(): JSX.Element {
  const user = useCurrentSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image ?? ''} />
          <AvatarFallback className={styles['user-button']}>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <CloseSession />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserButton;
