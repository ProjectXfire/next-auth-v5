import type { UserEntity } from '@/core/entities/user';
// Styles & Components
import styles from './UserInfo.module.css';
import { Card, CardHeader, CardContent } from '@/shared/components';
import { UserBoxInfo } from '..';

interface Props {
  label: string;
  user: UserEntity;
}

function UserInfo({ label, user }: Props): JSX.Element {
  return (
    <Card className={styles['user-info']}>
      <CardHeader>
        <p className={styles['user-info__title']}>{label}</p>
      </CardHeader>
      <CardContent className={styles['user-info__content']}>
        {Object.entries(user).map(([key, value], i) => {
          if (value === null) return <UserBoxInfo key={i} field={key} value='No info' />;
          if (typeof value === 'boolean')
            return (
              <UserBoxInfo
                key={i}
                field={key}
                variant={value ? 'success' : 'destructive'}
                value={value ? 'On' : 'Off'}
              />
            );
          return <UserBoxInfo key={i} field={key} value={value} />;
        })}
      </CardContent>
    </Card>
  );
}
export default UserInfo;
