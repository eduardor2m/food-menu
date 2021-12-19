import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { HiOutlineHome } from 'react-icons/hi';
// import { MdExitToApp } from 'react-icons/md';

import styles from '../styles/components/HeaderFavorite.module.scss';

interface Props {
  title: string;
  login: boolean;
  handleOnClick: () => void;
}

export const HeaderUser: React.FC<Props> = ({
  title,
  handleOnClick,
  login,
}) => {
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
        {login ? (
          <button onClick={handleOnClick}>
            <HiOutlineHome className={styles.icon} />
          </button>
        ) : (
          <button onClick={handleOnClick}>
            <BiTrash className={styles.icon} />
          </button>
        )}
      </div>
    </div>
  );
};
