'use client';

import { useRef, useState } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCode } from '@/core/states/auth';
import { LoginSchema } from '../../_schemas';
import { errorsQuery, TF_TOKEN } from '@/shared/constants';
// Services
import { login, validateCode } from '@/core/services/auth/client';
// Styles & Components
import styles from './Forms.module.css';
import {
  Button,
  CustomDialog,
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
import { Code } from '..';

const initResponse = { error: '', success: '' };

function LoginForm(): JSX.Element {
  const params = useSearchParams();
  const open = useCode((s) => s.open);
  const userIdRef = useRef('');
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState<{ error: string; success: string }>({
    ...initResponse,
    error: errorsQuery[params.get('error') ?? ''] ?? '',
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onTwoFactorAuth = async (code: string) => {
    setResponse(initResponse);
    setIsPending(true);
    const { error, success } = await validateCode({
      code,
      email: form.getValues('email'),
      userId: userIdRef.current,
    });
    if (error) setResponse((cv) => ({ ...cv, error }));
    if (success) setResponse((cv) => ({ ...cv, success }));
    setIsPending(false);
  };

  const onSubmit = async (data: z.infer<typeof LoginSchema>): Promise<void> => {
    setResponse(initResponse);
    setIsPending(true);
    const { error, success, data: user } = await login(data);
    if (error) setResponse((cv) => ({ ...cv, error }));
    if (success) {
      if (success === TF_TOKEN) {
        userIdRef.current = user!.id;
        open();
        setIsPending(false);
        return;
      }
      setResponse((cv) => ({ ...cv, success }));
    }
    setIsPending(false);
  };

  return (
    <>
      <CustomDialog
        title='Code'
        description='Please check your email and put the code sent'
        onClose={() => setResponse(initResponse)}
      >
        <Code onClick={onTwoFactorAuth} disabled={isPending} />
        <FormError message={response.error} />
      </CustomDialog>
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
        <NextLink href='/auth/reset-password-email'>Forgot password?</NextLink>
      </Button>
    </>
  );
}
export default LoginForm;
