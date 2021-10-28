import styles from '../styles/components/CardProduct.module.scss';

interface Dish {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface Props {
  dish: Dish;
}

export const CardProduct: React.FC<Props> = ({ dish }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.image}>
          <img src="assets/camarao.svg" />
        </section>
        <section className={styles.info}>
          <h3 className={styles.title}>{dish.name}</h3>
          <p className={styles.description}>{dish.description}</p>
          <p className={styles.price}>R$ {dish.price}</p>
        </section>
      </div>
    </div>
  );
};
