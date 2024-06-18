'use client';

// Styles & Components
import styles from './Socials.module.css';
import { FcGoogle } from 'react-icons/fc';
import { Button, Separator } from '@/shared/components';
import { FaGithub } from 'react-icons/fa';

function Socials(): JSX.Element {
  return (
    <div className={styles.socials}>
      <div className={styles.socials__separator}>
        <Separator />
        <span>Or</span>
        <Separator />
      </div>
      <Button className={styles.socials__button} name='google' type='button' variant='outline'>
        <FcGoogle size={20} />
      </Button>
      <Button className={styles.socials__button} name='github' type='button' variant='outline'>
        <FaGithub size={20} />
      </Button>
    </div>
  );
}
export default Socials;
