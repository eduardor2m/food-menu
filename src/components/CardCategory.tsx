import styles from '../styles/components/CardCategory.module.scss';

type CardCategory = {
  type: 'Carne' | 'Vinho' | 'Massa' | 'Pizza';
};

export const CardCategory: React.FC<CardCategory> = ({ type }) => {
  function getType() {
    switch (type) {
      case 'Carne':
        return 'assets/carnes.svg';
      case 'Vinho':
        return 'assets/vinhos.svg';
      case 'Massa':
        return 'assets/massas.svg';
      case 'Pizza':
        return 'assets/pizza.svg';
      default:
        return '🍔';
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={getType()} alt={getType()} />
        <h3>{type}</h3>
      </div>
    </div>
  );
};
