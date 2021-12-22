import React, { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { CardProduct } from '../components/CardProduct';
import { HeaderFavorites } from '../components/HeaderFavorites';
import { Modal } from '../components/Modal';
import { useCart } from '../hooks/useCart';
import styles from '../styles/pages/Cart.module.scss';

const Cart: NextPage = () => {
  const [modal, setModal] = useState(false);
  const [all, setAll] = useState(false);
  const [idProduct, setIdProduct] = useState(0);
  const [price, setPrice] = useState(0);

  const { cart, clearCart, removeFromCart, getTotalPrice } = useCart();

  useEffect(() => {
    const data = getTotalPrice();
    setPrice(data);
  }, [cart, getTotalPrice]);

  async function handleDeleteAll() {
    clearCart();
    setModal(false);
  }

  function handleCloseModal() {
    setAll(false);
    setModal(false);
  }

  async function handleDelete() {
    removeFromCart(idProduct);
    setModal(false);
  }

  async function cartRequestWhatsapp() {
    const url = `https://api.whatsapp.com/send?phone=5582982017899&text=Olá,%20tenho%20interesse%20no%20produtos%3A${cart.map(
      (item) => `%20${item.name}`
    )}.%20Quantidade:${cart.map(
      (item) => `%20${item.quantity}`
    )}.%20Subtotal%3A%20R%24%20${price}`;

    window.open(url, '_blank');
  }

  return (
    <>
      {modal && (
        <Modal
          handleDeleteProduct={() => handleDelete()}
          handleCloseModal={() => handleCloseModal()}
          handleDeleteAll={() => handleDeleteAll()}
          name={cart.find((product) => product.id === idProduct)?.name}
          all={all}
          cart={true}
        />
      )}
      <div className={styles.container}>
        <Head>
          <title>Carrinho</title>
          <meta name="description" content="Carrinho de compras" />
        </Head>

        <main>
          <HeaderFavorites
            title="Carrinho"
            handleOnClick={() => {
              setAll(true);
              setModal(true);
            }}
          />
          <h2 className={styles.titleDishs}>Produtos</h2>
          <section className={styles.dishs}>
            {cart.length > 0 ? (
              cart.map((item) => (
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
                          quantity: item.quantity,
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
              <p>Nenhum produto no carrinho</p>
            )}
          </section>
          <section className={styles.footer}>
            <button
              onClick={() => {
                cartRequestWhatsapp();
              }}
              className={styles.buttonWhatsapp}
            >
              <section className={styles.wrapperButton}>
                <section className={styles.sectionTitle}>
                  <h1>Finalizar compra</h1>{' '}
                </section>
                <section className={styles.sectionPriceTotal}>
                  <span>R$: {price}</span>
                </section>
              </section>
            </button>
            <button>
              <Link href="/">
                <a className={styles.wrapperLink}>
                  <section className={styles.wrapperButton}>
                    <section className={styles.sectionTitle}>
                      <h1>Continuar comprando</h1>{' '}
                    </section>
                    <section className={styles.sectionPriceTotal}>
                      <AiOutlineHome size={24} color="#fff" />
                    </section>
                  </section>
                </a>
              </Link>
            </button>
          </section>
        </main>
      </div>
    </>
  );
};

export default Cart;
