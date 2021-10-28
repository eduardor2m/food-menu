import styles from '../styles/components/CardDish.module.scss';

interface Dish {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface Props {
  dish: Dish;
}

export const CardDish: React.FC<Props> = ({ dish }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.image}>
          <img src="assets/camarao.svg" />
        </section>
        <section className={styles.info}>
          <h3 className={styles.title}>{dish.name}</h3>
          <p className={styles.description}>{dish.description}</p>
          <p className={styles.price}>{dish.price}</p>
        </section>
      </div>
    </div>
  );
};
