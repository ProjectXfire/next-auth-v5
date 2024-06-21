// Styles & Components
import styles from './Card.module.css';
import { Card, CardHeader, CardFooter } from '@/shared/components';
import { BackButton, CardCustomHeader } from '..';

function ErrorCard(): JSX.Element {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardCustomHeader label='Oops! Something went wrong!' />
      </CardHeader>
      <CardFooter>
        <BackButton label='Back to login' href='/auth/login' />
      </CardFooter>
    </Card>
  );
}
export default ErrorCard;
