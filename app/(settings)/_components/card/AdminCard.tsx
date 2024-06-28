'use client';

import { toast } from 'sonner';
// Services
import { testAdminRole } from '@/core/services/user/client';
import { testAdminRoleServer } from '@/core/services/user/server';
// Styles & Components
import styles from './Admin.module.css';
import { AdminItem, RoleGate } from '..';
import { Card, CardContent, CardHeader, FormSuccess } from '@/shared/components';

interface Props {
  role: string;
}

function AdminCard({ role }: Props): JSX.Element {
  const onServerActionClick = async () => {
    const { error, success } = await testAdminRoleServer();
    if (error) toast.error(error);
    if (success) toast.success(success);
  };

  const onApiRouteClick = async () => {
    const { error, success } = await testAdminRole();
    if (error) toast.error(error);
    if (success) toast.success(success);
  };

  return (
    <Card className={styles['card']}>
      <CardHeader>
        <p className={styles['card__title']}>🗝️ Admin</p>
      </CardHeader>
      <CardContent className={styles['card__content']}>
        <RoleGate role={role}>
          <FormSuccess message='Your are allowed to see this content.' />
        </RoleGate>
        <AdminItem
          fieldName='Admin-only API Route'
          buttonLabel='Click to test'
          onClick={onApiRouteClick}
        />
        <AdminItem
          fieldName='Admin-only Server Action'
          buttonLabel='Click to test'
          onClick={onServerActionClick}
        />
      </CardContent>
    </Card>
  );
}
export default AdminCard;
