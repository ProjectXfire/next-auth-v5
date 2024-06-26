import styles from './Card.module.css';

interface Props {
  label: string;
}

function CardCustomHeader({ label }: Props): JSX.Element {
  return (
    <div className={styles['card-header']}>
      <h1>🔏 Auth</h1>
      <p>{label}</p>
    </div>
  );
}
export default CardCustomHeader;
