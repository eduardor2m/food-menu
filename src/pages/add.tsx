import { useState } from 'react';

import { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { HeaderUser } from '../components/HeaderUser';
import styles from '../styles/pages/Add.module.scss';

export default function Add() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('carne');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  async function handleClick() {
    try {
      await fetch(
        `${
          process.env.NEXT_PUBLIC_DEVELOPMENT === 'true'
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`
            : 'http://localhost:3000/api/products'
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: Math.floor(Date.now() * Math.random()).toString(36),
            name,
            category,
            price,
            image,
            description,
          }),
        }
      );
      setName('');
      setCategory('');
      setPrice(0);
      setImage('');
      setDescription('');
    } catch (error) {
      alert('Não foi possível adicionar o produto');
    }
  }

  function handlePageDelete() {
    router.push('/delete');
  }

  async function handleSignOut() {
    await signOut();
    return router.push('/login');
  }

  return (
    <div className={styles.container}>
      <HeaderUser
        title="Adcionar - Produtos"
        handleOnClick={() => handlePageDelete()}
        login={false}
      />
      <div className={styles.content}>
        <input
          type="text"
          id="name"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <select
          id="category"
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="carne">Carne</option>
          <option value="massa">Massa</option>
          <option value="vinho">Vinho</option>
          <option value="pizza">Pizza</option>
        </select>
        <input
          type="number"
          id="price"
          placeholder="Preço"
          onChange={(event) => setPrice(Number(event.target.value))}
        />
        <input
          type="text"
          id="image"
          placeholder="Imagem"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
        <input
          type="text"
          id="description"
          placeholder="Descrição"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button onClick={handleClick}>Adicionar</button>
        <button
          onClick={() => handleSignOut()}
          style={{ backgroundColor: '#c72828' }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: { session } };
};
