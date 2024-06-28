import styles from './Admin.module.css';

interface Props {
  field: string;
  value: string;
  variant?: 'destructive' | 'success' | 'default';
}

const variants = {
  destructive: styles['user-item--destructive'],
  success: styles['user-item--success'],
  default: '',
};

function UserBoxInfo({ field, value, variant = 'default' }: Props): JSX.Element {
  return (
    <div className={styles['user-item']}>
      <p className={styles['user-item__key']}>{field}</p>
      <p className={`${styles['user-item__value']} ${variants[variant]}`}>{value}</p>
    </div>
  );
}
export default UserBoxInfo;
