'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../../_schemas';
import { errorsQuery } from '@/shared/constants';
// Services
import { login } from '@/core/services/auth/client';
// Dtos
import type { LoginDto } from '@/core/dtos/auth';
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

const initResponse = { error: '', success: '' };

function LoginForm(): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const params = useSearchParams();
  const [response, setResponse] = useState<{ error: string; success: string }>({
    ...initResponse,
    error: errorsQuery[params.get('error') ?? ''] ?? '',
  });

  const form = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginDto): Promise<void> => {
    setResponse(initResponse);
    setIsPending(true);
    const { error, success } = await login(data);
    if (error) setResponse((cv) => ({ ...cv, error }));
    if (success) setResponse((cv) => ({ ...cv, success }));
    setIsPending(false);
  };

  return (
    <>
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
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='***********'
                    {...field}
                    type='password'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className={styles['form__message']} />
              </FormItem>
            )}
          />
          <FormError message={response.error} />
          <FormSuccess message={response.success} />
          <Button name='login' type='submit'>
            Login
          </Button>
        </form>
      </Form>
      <Button className='px-0' size='sm' variant='link' asChild>
        <NextLink href='/auth/reset'>Forgot password?</NextLink>
      </Button>
    </>
  );
}
export default LoginForm;
