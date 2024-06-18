'use client';

// Styles & Components
import styles from './Form.module.css';
import { Check } from 'lucide-react';

interface Props {
  message?: string;
}

function FormSuccess({ message }: Props): JSX.Element {
  if (!message) return <></>;

  return (
    <div className={`${styles['form-message']} ${styles['form-success']}`}>
      <Check />
      {message}
    </div>
  );
}
export default FormSuccess;
