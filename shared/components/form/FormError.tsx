'use client';

// Styles & Components
import styles from './Form.module.css';
import { TriangleAlert } from 'lucide-react';

interface Props {
  message?: string;
}

function FormError({ message }: Props): JSX.Element {
  if (!message) return <></>;

  return (
    <div className={`${styles['form-message']} ${styles['form-error']}`}>
      <TriangleAlert />
      {message}
    </div>
  );
}
export default FormError;
