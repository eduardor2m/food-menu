import { AiOutlineStar } from 'react-icons/ai';

import Link from 'next/link';

import styles from '../styles/components/Header.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="assets/logo.svg" alt="logo" />
        <Link href="/favorites">
          <AiOutlineStar className={styles.icon} />
        </Link>
      </div>
    </div>
  );
};
