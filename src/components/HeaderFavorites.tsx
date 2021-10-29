import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

import styles from '../styles/components/HeaderProduct.module.scss';

interface Props {
  title: string;
  handleOnClick: () => void;
}

export const HeaderFavorites: React.FC<Props> = ({ title, handleOnClick }) => {
  function handleBack() {
    window.history.back();
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button onClick={handleBack}>
          <AiOutlineArrowLeft className={styles.icon} />
        </button>
        <h1 className={styles.title}>{title}</h1>
        <button onClick={handleOnClick}>
          <BiTrash className={styles.icon} />
        </button>
      </div>
    </div>
  );
};
