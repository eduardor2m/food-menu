import React, { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { CardProduct } from '../components/CardProduct';
import { CartButton } from '../components/CartButton';
import { HeaderFavorites } from '../components/HeaderFavorites';
import { Modal } from '../components/Modal';
import { useCart } from '../hooks/useCart';
import styles from '../styles/pages/Favorites.module.scss';

type Product = {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const Favorites: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([] as Product[]);
  const [modal, setModal] = useState(false);
  const [all, setAll] = useState(false);
  const [idProduct, setIdProduct] = useState(0);

  const { cart } = useCart();

  useEffect(() => {
    async function getProducts() {
      const storageKey = '@FoodMenu:favorite';
      const productsStoraged: Product[] = await JSON.parse(
        localStorage.getItem(storageKey) || '[]'
      );
      setProducts(productsStoraged);
    }
    getProducts();
  }, []);

  async function handleDeleteAll() {
    localStorage.removeItem('@FoodMenu:favorite');
    setProducts([]);
    setModal(false);
  }

  function handleCloseModal() {
    setAll(false);
    setModal(false);
  }

  async function handleDelete() {
    const productsFiltered = products.filter(
      (product) => product.id !== idProduct
    );
    localStorage.setItem(
      '@FoodMenu:favorite',
      JSON.stringify(productsFiltered)
    );
    setProducts(productsFiltered);
    setModal(false);
  }

  return (
    <>
      {modal && (
        <Modal
          handleDeleteProduct={() => handleDelete()}
          handleCloseModal={() => handleCloseModal()}
          handleDeleteAll={() => handleDeleteAll()}
          name={products.find((product) => product.id === idProduct)?.name}
          all={all}
        />
      )}
      <div className={styles.container}>
        <Head>
          <title>Favoritos</title>
          <meta name="description" content="Produtos favoritos" />
        </Head>

        <main>
          {cart.length > 0 ? <CartButton count={cart.length} /> : null}
          <HeaderFavorites
            title="Favoritos"
            handleOnClick={() => {
              setAll(true);
              setModal(true);
            }}
          />
          <h2 className={styles.titleDishs}>Produtos</h2>
          <section className={styles.dishs}>
            {products.length > 0 ? (
              products.map((item) => (
                <section className={styles.wrapperProduct} key={item.id}>
                  <Link
                    href={{
                      pathname: '/products/[slug]',
                      query: { slug: item.id },
                    }}
                  >
                    <a>
                      <CardProduct
                        dish={{
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          description: item.description,
                        }}
                      />
                    </a>
                  </Link>
                  <button
                    onClick={() => {
                      setIdProduct(item.id);
                      setModal(true);
                    }}
                  >
                    <section className={styles.wrapperDelete}>
                      <BiTrash size={24} color="#fff" />
                    </section>
                  </button>
                </section>
              ))
            ) : (
              <p>Nenhum produto favorito</p>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default Favorites;
