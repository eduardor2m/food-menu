import { AiOutlineStar } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

import styles from '../styles/components/Modal.module.scss';

interface Props {
  handleDeleteProduct: () => void;
  handleCloseModal: () => void;
  handleDeleteAll: () => void;
  name?: string;
  all?: boolean;
}

export const Modal: React.FC<Props> = ({
  handleDeleteProduct,
  handleDeleteAll,
  handleCloseModal,
  name,
  all,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {all ? (
          <section className={styles.sectionInfo}>
            <h1>Deseja deletar todos os itens dos favoritos?</h1>
          </section>
        ) : (
          <section className={styles.sectionInfo}>
            <h1>Deseja deletar este item dos favoritos?</h1>
            <p>Item: {name}</p>
          </section>
        )}

        <section className={styles.sectionButtons}>
          <button onClick={handleCloseModal}>
            <section>
              <span>Não</span>
              <AiOutlineStar className={styles.icon} />
            </section>
          </button>
          <button onClick={all ? handleDeleteAll : handleDeleteProduct}>
            <section>
              <span>Sim</span>
              <BiTrash className={styles.icon} />
            </section>
          </button>
        </section>
      </div>
    </div>
  );
};
