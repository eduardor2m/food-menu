import { IoCart } from 'react-icons/io5';

import Link from 'next/link';

import styles from '../styles/components/CartButton.module.scss';

interface CartButtonProps {
  count: number;
}

export const CartButton: React.FC<CartButtonProps> = ({ count }) => {
  return (
    <Link href="/cart">
      <a className={styles.cart}>
        <IoCart className={styles.icon} />
        <span>{count}</span>
      </a>
    </Link>
  );
};
