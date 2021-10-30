import { AiOutlineStar } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

import styles from '../styles/components/Modal.module.scss';

interface Props {
  handleDeleteProduct: () => void;
  handleCloseModal: () => void;
  name?: string;
}

export const Modal: React.FC<Props> = ({
  handleDeleteProduct,
  handleCloseModal,
  name,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.sectionInfo}>
          <h1>Deseja deletar este item dos favoritos?</h1>
          <p>Item: {name}</p>
        </section>

        <section className={styles.sectionButtons}>
          <button onClick={handleCloseModal}>
            <section>
              <span>Não</span>
              <AiOutlineStar className={styles.icon} />
            </section>
          </button>
          <button onClick={handleDeleteProduct}>
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
