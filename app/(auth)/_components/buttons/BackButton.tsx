'use client';

import NextLink from 'next/link';
// Styles & Components
import styles from './Buttons.module.css';
import { Button } from '@/shared/components';

interface Props {
  label: string;
  href: string;
}

function BackButton({ href, label }: Props): JSX.Element {
  return (
    <Button
      className={styles['back-button']}
      asChild
      type='button'
      variant='ghost'
      size='sm'
      name='back'
    >
      <NextLink href={href}>{label}</NextLink>
    </Button>
  );
}
export default BackButton;
