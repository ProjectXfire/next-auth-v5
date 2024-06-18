import styles from './Header.module.css';

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <h1>🔏 Auth</h1>
      <p>A simple authentication service</p>
    </header>
  );
}
export default Header;
