import styles from './Block.module.css';

interface Props {
  children: React.ReactNode;
}

function Block({ children }: Props): JSX.Element {
  return <section className={styles.block}>{children}</section>;
}
export default Block;
