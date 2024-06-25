'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
// Services
import { confirmEmail } from '@/core/services/auth/client';
// Styles & Components
import styles from './Forms.module.css';
import { FormError, FormSuccess, Loading } from '@/shared/components';

function NewVerificationForm(): JSX.Element {
  const query = useSearchParams();
  const [response, setResponse] = useState({ error: '', success: '' });
  const calledRef = useRef(false);

  const onSubmit = useCallback(async () => {
    calledRef.current = true;
    const token = query.get('token');
    if (!token) {
      setResponse((cv) => ({ ...cv, error: 'Missing token!' }));
      return;
    }
    const { error, success } = await confirmEmail(token);
    if (error) setResponse((cv) => ({ ...cv, error, success: '' }));
    if (success) setResponse((cv) => ({ ...cv, success, error: '' }));
  }, [query]);

  useEffect(() => {
    if (calledRef.current) return;
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <FormError message={response.error} />
      <FormSuccess message={response.success} />
      {!response.error && !response.success && (
        <div className={styles['form-verification']}>
          <Loading color='var(--color-primary)' />
        </div>
      )}
    </>
  );
}
export default NewVerificationForm;
