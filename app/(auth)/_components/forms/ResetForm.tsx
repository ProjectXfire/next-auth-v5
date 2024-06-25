'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordSchema } from '../../_schemas';
import type { ChangePasswordDto } from '@/core/dtos/auth';
import { resetPassword } from '@/core/services/auth/client';
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
} from '@/shared/components';

function ResetForm(): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState<{ error: string; success: string }>({
    error: '',
    success: '',
  });

  const form = useForm<ChangePasswordDto>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ChangePasswordDto): Promise<void> => {
    setIsPending(true);
    const { error, success } = await resetPassword(data);
    if (error) setResponse({ error, success: '' });
    if (success) setResponse({ error: '', success });
    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form className={styles['form']} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='john.doe@example.com' {...field} disabled={isPending} />
              </FormControl>
              <FormMessage className={styles['form__message']} />
            </FormItem>
          )}
        />
        <FormError message={response.error} />
        <FormSuccess message={response.success} />
        <Button name='login' type='submit'>
          Send reset email
        </Button>
      </form>
    </Form>
  );
}
export default ResetForm;
