/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';

import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

import { HeaderUser } from '../components/HeaderUser';
import styles from '../styles/pages/Add.module.scss';

export default function Add() {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  });
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  async function handleClick() {
    try {
      await fetch(`http://localhost:3000/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          category,
          price,
          image,
          description,
        }),
      });
      setId(0);
      setName('');
      setCategory('');
      setPrice(0);
      setImage('');
      setDescription('');
    } catch (error) {
      alert('Não foi possível adicionar o produto');
    }
  }

  return (
    <div className={styles.container}>
      <HeaderUser
        title="Adcionar - Produtos"
        handleOnClick={() => signOut()}
        login={false}
      />
      <div className={styles.content}>
        <input
          type="number"
          id="id"
          placeholder="ID"
          onChange={(event) => setId(Number(event.target.value))}
        />
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
      </div>
    </div>
  );
}
