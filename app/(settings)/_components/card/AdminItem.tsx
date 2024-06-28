'use client';

// Styles & Components
import { Button } from '@/shared/components';
import styles from './Admin.module.css';

interface Props {
  fieldName: string;
  buttonLabel: string;
  onClick: () => void;
}

function AdminItem({ fieldName, buttonLabel, onClick }: Props): JSX.Element {
  return (
    <div className={styles['admin-item']}>
      <p className={styles['admin-item__text']}>{fieldName}</p>
      <Button type='button' name={fieldName} onClick={onClick}>
        {buttonLabel}
      </Button>
    </div>
  );
}
export default AdminItem;
