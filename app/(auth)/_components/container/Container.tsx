import styles from './Container.module.css';

interface Props {
  children: React.ReactNode;
}

function Container({ children }: Props): JSX.Element {
  return <main className={styles['auth-container']}>{children}</main>;
}
export default Container;
