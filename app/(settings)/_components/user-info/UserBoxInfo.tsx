import styles from './UserInfo.module.css';

interface Props {
  field: string;
  value: string;
  variant?: 'destructive' | 'success' | 'default';
}

const variants = {
  destructive: styles['user-box-info--destructive'],
  success: styles['user-box-info--success'],
  default: '',
};

function UserBoxInfo({ field, value, variant = 'default' }: Props): JSX.Element {
  return (
    <div className={styles['user-box-info']}>
      <p className={styles['user-box-info__key']}>{field}</p>
      <p className={`${styles['user-box-info__value']} ${variants[variant]}`}>{value}</p>
    </div>
  );
}
export default UserBoxInfo;
