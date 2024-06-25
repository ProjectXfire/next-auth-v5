'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '../../_schemas';
// Services
import { register } from '@/core/services/auth/client';
// Dtos
import type { RegisterDto } from '@/core/dtos/auth';
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

const initResponse = { error: '', success: '', name: '' };

function RegisterForm(): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState(initResponse);

  const form = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = async (data: RegisterDto): Promise<void> => {
    setResponse(initResponse);
    setIsPending(true);
    const { error, success } = await register(data);
    if (error) setResponse((cv) => ({ ...cv, error }));
    if (success) setResponse((cv) => ({ ...cv, success }));
    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form className={styles['form']} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} disabled={isPending} />
              </FormControl>
              <FormMessage className={styles['form__message']} />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='*******' {...field} type='password' disabled={isPending} />
              </FormControl>
              <FormMessage className={styles['form__message']} />
            </FormItem>
          )}
        />
        <FormError message={response.error} />
        <FormSuccess message={response.success} />
        <Button name='register' type='submit'>
          Create an account
        </Button>
      </form>
    </Form>
  );
}
export default RegisterForm;
