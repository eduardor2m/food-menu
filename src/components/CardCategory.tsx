import styles from '../styles/components/CardCategory.module.scss';

export const CardCategory: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="assets/carnes.svg" alt="carnes" />
        <h3>Carnes</h3>
      </div>
    </div>
  );
};
