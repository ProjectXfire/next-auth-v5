import type { UserAuth } from '@/core/types/user';
// Styles & Components
import styles from './Admin.module.css';
import { Card, CardHeader, CardContent } from '@/shared/components';
import { UserItem } from '..';

interface Props {
  label: string;
  user: UserAuth;
}

function UserCard({ label, user }: Props): JSX.Element {
  return (
    <Card className={styles['card']}>
      <CardHeader>
        <p className={styles['card__title']}>{label}</p>
      </CardHeader>
      <CardContent className={styles['card__content']}>
        {Object.entries(user).map(([key, value], i) => {
          if (value === null) return <UserItem key={i} field={key} value='No info' />;
          if (typeof value === 'boolean')
            return (
              <UserItem
                key={i}
                field={key}
                variant={value ? 'success' : 'destructive'}
                value={value ? 'On' : 'Off'}
              />
            );
          return <UserItem key={i} field={key} value={value} />;
        })}
      </CardContent>
    </Card>
  );
}
export default UserCard;
