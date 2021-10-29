import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { HeaderProduct } from '../../components/HeaderProduct';
import styles from '../../styles/pages/Product.module.scss';

type Product = {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function Dish() {
  const [product, setProduct] = useState<Product>({} as Product);
  const router = useRouter();

  useEffect(() => {
    const { slug } = router.query;

    if (!slug) {
      router.push('/');
    }
    async function fetchData() {
      const data = await (await fetch(`/api/product/${slug}`)).json();
      setProduct(data);
    }

    fetchData();
  });

  return (
    <div>
      <HeaderProduct category={product.category} />
      <section className={styles.content}>
        <section className={styles.cardProduct}>
          <section className={styles.productImg}>
            <img src={product.image} alt={product.name} />
          </section>
          <section className={styles.productInfo}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>
              <span>R$</span> {product.price}
            </p>
          </section>
        </section>
      </section>
    </div>
  );
}
