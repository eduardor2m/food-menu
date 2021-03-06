import { BiTrash } from 'react-icons/bi';

import styles from '../styles/components/CardProduct.module.scss';

interface Dish {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity?: number;
  handleOnClick?: () => void;
}

interface Props {
  dish: Dish;
}

export const CardProduct: React.FC<Props> = ({ dish }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.image}>
          <img src={dish.image} />
        </section>
        <section className={styles.info}>
          <h3 className={styles.title}>{dish.name}</h3>
          <p className={styles.description}>{dish.description}</p>
          <section>
            <p className={styles.price}>R$ {dish.price}</p>
            {dish.quantity && (
              <p className={styles.quantity}>
                {dish.quantity} {dish.quantity > 1 ? 'unidades' : 'unidade'}
              </p>
            )}
          </section>
        </section>
        {dish.handleOnClick ? (
          <button className={styles.button} onClick={dish.handleOnClick}>
            <BiTrash size={24} color="#c72828" />
          </button>
        ) : null}
      </div>
    </div>
  );
};
