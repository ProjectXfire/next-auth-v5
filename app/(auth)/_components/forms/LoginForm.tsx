'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../../_schemas';
// Styles & Components
import styles from './Forms.module.css';
import { CardWrapper } from '..';
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

function LoginForm(): JSX.Element {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>): void => {
    const { email, password } = data;
  };

  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
      showSocial
    >
      <Form {...form}>
        <form className={styles['login-form']} onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='john.doe@example.com' {...field} />
                </FormControl>
                <FormMessage className={styles['login-form__message']} />
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
                  <Input placeholder='*******' {...field} type='password' />
                </FormControl>
                <FormMessage className={styles['login-form__message']} />
              </FormItem>
            )}
          />
          <FormError message='Invalid credentials!' />
          <FormSuccess message='Valid ok' />
          <Button name='login' type='submit'>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
export default LoginForm;
