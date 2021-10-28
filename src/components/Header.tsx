import { IoEnterOutline } from 'react-icons/io5';

import styles from '../styles/components/Header.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="assets/logo.svg" alt="logo" />
        <IoEnterOutline className={styles.icon} />
      </div>
    </div>
  );
};
