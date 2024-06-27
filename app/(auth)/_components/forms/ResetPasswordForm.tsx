'use client';

import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordSchema } from '../../_schemas';
import { resetPassword, validateResetToken } from '@/core/services/auth/client';
// Styles & Components
import styles from './Forms.module.css';
import {
  Button,
  Form,
  FormControl,
  FormError,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSuccess,
  Input,
  Loading,
} from '@/shared/components';

function ResetPasswordForm(): JSX.Element {
  const query = useSearchParams();
  const [isPending, setIsPending] = useState(true);
  const [response, setResponse] = useState<{ error: string; success: string }>({
    error: '',
    success: '',
  });

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (payload: z.infer<typeof ChangePasswordSchema>): Promise<void> => {
    setIsPending(true);
    const token = query.get('token');
    if (!token) {
      if (token) setResponse({ error: 'Token not found', success: '' });
      return;
    }
    const { data, error: tokenError } = await validateResetToken(token);
    if (tokenError) {
      setResponse({ error: tokenError, success: '' });
      setIsPending(false);
      return;
    }
    const { error, success } = await resetPassword(data!.id, {
      email: data!.email,
      password: payload.password,
    });
    if (error) setResponse({ error, success: '' });
    if (success) setResponse({ error: '', success });
    setIsPending(false);
  };

  const isValidToken = useCallback(async () => {
    setIsPending(true);
    const token = query.get('token');
    if (!token) {
      setIsPending(false);
      return { data: null, error: 'Token not found', success: null };
    }
    const { error, success } = await validateResetToken(token);
    if (error) setResponse({ error, success: '' });
    if (success) setResponse({ error: '', success });
    setIsPending(false);
  }, [query]);

  useEffect(() => {
    isValidToken();
  }, [isValidToken]);

  if (isPending)
    return (
      <div className={styles['form-verification']}>
        <Loading />
      </div>
    );

  return (
    <Form {...form}>
      <form className={styles['form']} onSubmit={form.handleSubmit(onSubmit)}>
        <>
          {!response.error && (
            <>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='***********'
                        type='password'
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className={styles['form__message']} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='***********'
                        type='password'
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className={styles['form__message']} />
                  </FormItem>
                )}
              />
              <Button name='login' type='submit' disabled={isPending}>
                Update password
              </Button>
            </>
          )}
        </>
        <FormError message={response.error} />
        <FormSuccess message={response.success} />
      </form>
    </Form>
  );
}
export default ResetPasswordForm;
