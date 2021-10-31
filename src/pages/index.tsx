import React, { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { CardCategory } from '../components/CardCategory';
import { CardProduct } from '../components/CardProduct';
import { Header } from '../components/Header';
import styles from '../styles/pages/Home.module.scss';

type Product = {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
  const [change, setChange] = useState(true);
  const [inputValue, setInputValue] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const data: Product[] = await (
        await fetch(
          `${
            process.env.NEXT_PUBLIC_DEVELOPMENT === 'true'
              ? process.env.NEXT_PUBLIC_ADRESS
              : 'http://localhost:3000/api/products'
          }`
        )
      ).json();
      setProducts(data);
    }

    fetchProducts();
  });

  function handleFilterNameProduct(search: string) {
    setInputValue(!search);
    search = search.charAt(0).toUpperCase() + search.slice(1);
    const filter = products.filter((item) => item.name.includes(search));

    if (filter) {
      setProductsFiltered(filter);
      setChange(false);
    }
  }

  function handleCategory(categoryType: string) {
    if (categoryType === 'all') {
      return setChange(true);
    }
    const productsFilter = products.filter(
      (product) => product.category === categoryType
    );
    setChange(false);
    setProductsFiltered(productsFilter);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
        <Header />
        <input
          className={styles.input}
          type="text"
          placeholder="Buscar"
          onChange={(event) => handleFilterNameProduct(event.target.value)}
        />
        {inputValue ? (
          <section>
            <h2 className={styles.titleCategories}>Categorias</h2>
            <section className={styles.categories}>
              <ScrollMenu>
                <button
                  className={styles.buttonCategory}
                  onClick={() => handleCategory('all')}
                >
                  <CardCategory type="Tudo" />
                </button>
                <button
                  className={styles.buttonCategory}
                  onClick={() => handleCategory('carne')}
                >
                  <CardCategory type="Carne" />
                </button>
                <button
                  className={styles.buttonCategory}
                  onClick={() => handleCategory('pizza')}
                >
                  <CardCategory type="Pizza" />
                </button>
                <button
                  className={styles.buttonCategory}
                  onClick={() => handleCategory('massa')}
                >
                  <CardCategory type="Massa" />
                </button>
                <button
                  className={styles.buttonCategory}
                  onClick={() => handleCategory('vinho')}
                >
                  <CardCategory type="Vinho" />
                </button>
              </ScrollMenu>
            </section>
          </section>
        ) : null}

        <h2 className={styles.titleDishs}>Pratos</h2>
        <section className={styles.dishs}>
          {change
            ? products.map((item) => (
                <Link
                  key={item.id}
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
              ))
            : productsFiltered.map((item) => (
                <Link
                  key={item.id}
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
              ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
