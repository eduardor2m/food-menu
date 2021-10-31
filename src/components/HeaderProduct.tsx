import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdOutlineFavoriteBorder } from 'react-icons/md';

import styles from '../styles/components/HeaderProduct.module.scss';

interface Props {
  category: string;
  handleOnClick: () => void;
}

export const HeaderProduct: React.FC<Props> = ({ category, handleOnClick }) => {
  function handleBack() {
    window.history.back();
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button onClick={handleBack}>
          <AiOutlineArrowLeft className={styles.icon} />
        </button>
        <h1 className={styles.title}>Categoria - {category}</h1>
        <button onClick={handleOnClick}>
          <MdOutlineFavoriteBorder className={styles.icon} />
        </button>
      </div>
    </div>
  );
};
