'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
// Services
import { confirmEmail } from '@/core/services/verification-token/client';
// Styles & Components
import styles from './Forms.module.css';
import { CardWrapper } from '..';
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
    if (error) setResponse((cv) => ({ ...cv, error }));
    if (success) setResponse((cv) => ({ ...cv, success }));
  }, [query]);

  useEffect(() => {
    if (calledRef.current) return;
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel='Confirming your verification'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      <FormError message={response.error} />
      <FormSuccess message={response.success} />
      {!response.error && !response.success && (
        <div className={styles['form-verification']}>
          <Loading color='var(--color-primary)' />
        </div>
      )}
    </CardWrapper>
  );
}
export default NewVerificationForm;
