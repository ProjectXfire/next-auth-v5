import styles from './Layout.module.css';

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props): JSX.Element {
  return <main className={styles['auth-layout']}>{children}</main>;
}
export default AuthLayout;
