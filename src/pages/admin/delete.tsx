import React, { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';

import axios from 'axios';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CardProduct } from '../../components/CardProduct';
import { HeaderUser } from '../../components/HeaderUser';
import { Modal } from '../../components/Modal';
import styles from '../../styles/pages/Delete.module.scss';

type Product = {
  ref: string;
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const Delete: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState(false);
  const [all, setAll] = useState(false);
  const [idProduct, setIdProduct] = useState(0);
  const [refProduct, setRefProduct] = useState('');

  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  function handleCloseModal() {
    setAll(false);
    setModal(false);
  }

  async function handleDeleteAll() {
    setModal(false);
  }

  async function handleDelete() {
    axios.delete(
      `${
        process.env.NEXT_PUBLIC_DEVELOPMENT === 'true'
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/product/${refProduct}`
          : `http://localhost:3000/api/product/${refProduct}`
      }`
    );
    setModal(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Deletar</title>
        <meta name="description" content="Deletar Produtos" />
      </Head>

      <main>
        {modal && (
          <Modal
            handleDeleteProduct={() => handleDelete()}
            handleCloseModal={() => handleCloseModal()}
            handleDeleteAll={() => handleDeleteAll()}
            name={products.find((product) => product.id === idProduct)?.name}
            all={all}
            cart={true}
          />
        )}
        <HeaderUser
          title="Deletar - Produtos"
          handleOnClick={() => signOut()}
          login={true}
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
                    setRefProduct(item.ref);
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
  );
};

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

  const { data } = await axios.get(
    `${
      process.env.NEXT_PUBLIC_DEVELOPMENT === 'true'
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`
        : 'http://localhost:3000/api/products'
    }`,
    {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    }
  );

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
  // ...
};

export default Delete;
