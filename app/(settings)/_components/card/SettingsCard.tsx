/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserSchema } from '../../_schemas/user.schema';
import { Role, type UserAuth } from '@/core/types/user';
// Services
import { updateUser } from '@/core/services/user/client';
// Styles & Components
import styles from './Admin.module.css';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  FormError,
  FormSuccess,
  Switch,
  FormDescription,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/shared/components';
import { useSession } from 'next-auth/react';

const initResponse = { error: '', success: '' };

interface Props {
  user: UserAuth;
}

function SettingsCard({ user }: Props): JSX.Element {
  const { update } = useSession();
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState<{ error: string; success: string }>({
    ...initResponse,
  });
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user.name ?? '',
      isTwoFactorEnabled: user.isTwoFactorEnabled ?? false,
      role: user.role ?? 'USER',
      password: '',
      confirmPassword: '',
      isOauth: user.isOauth,
    },
  });

  const onSubmit = async (payload: z.infer<typeof UserSchema>): Promise<void> => {
    setResponse(initResponse);
    setIsPending(true);
    const { confirmPassword, ...rest } = payload;
    const { error, success } = await updateUser(user.id!, rest);
    if (error) setResponse((cv) => ({ ...cv, error }));
    if (success) {
      update();
      setResponse((cv) => ({ ...cv, success }));
    }
    setIsPending(false);
  };

  useEffect(() => {
    form.setValue('password', undefined);
    form.setValue('confirmPassword', undefined);
  }, []);

  return (
    <Card className={styles.card}>
      <CardHeader>
        <p className={styles.card__title}>⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className={styles['settings-form-card']} onSubmit={form.handleSubmit(onSubmit)}>
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
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                      <SelectItem value={Role.USER}>User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!user.isOauth && (
              <>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='*********'
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
                          type='password'
                          placeholder='*********'
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
                  name='isTwoFactorEnabled'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                      <div className='space-y-0.5'>
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>On / Off the two factor authentication</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormError message={response.error} />
            <FormSuccess message={response.success} />
            <Button name='login' type='submit'>
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
export default SettingsCard;
