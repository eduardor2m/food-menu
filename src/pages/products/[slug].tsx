import { useEffect, useState } from 'react';
import { AiOutlineWhatsApp } from 'react-icons/ai';

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
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
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

  useEffect(() => {
    setPrice(product.price * quantity);
  }, [product, quantity]);

  function handleChangeQuantityNegative() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setPrice(quantity * product.price);
    } else {
      return alert('Quantidade insuficiente');
    }
  }

  function handleChangeQuantityPositive() {
    setQuantity(quantity + 1);
    setPrice(quantity * product.price);
  }

  function redirectWhatsapp() {
    window.open(
      `https://api.whatsapp.com/send?phone=5582998394523&text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido!%20Nome%3A%20${product.name}%2C%20Quantidade%3A%20${quantity}%20e%20Pre%C3%A7o%3A%20${price}`
    );
  }

  async function HandleFavorite() {
    try {
      const storageKey = '@FoodMenu:favorite';
      const productsStoraged = localStorage.getItem(storageKey);
      const products = productsStoraged ? JSON.parse(productsStoraged) : [];
      if (products.find((item: Product) => item.id === product.id)) {
        return alert('Produto já adicionado aos favoritos');
      }
      const data = [...products, product];
      localStorage.setItem(storageKey, JSON.stringify(data));
      alert('Produto adicionado aos favoritos!');
    } catch (error) {
      alert('Erro ao adicionar produto aos favoritos');
    }
  }

  return (
    <div>
      <HeaderProduct
        category={product.category}
        handleOnClick={() => HandleFavorite()}
      />
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
        <section>
          <h1 className={styles.titleQuantity}>Quantidade</h1>

          <section className={styles.quantity}>
            <section className={styles.quantityText}>
              <p>{product.name}</p>
            </section>
            <section className={styles.quantityButtons}>
              <button onClick={() => handleChangeQuantityNegative()}>-</button>
              <p>{quantity}</p>
              <button onClick={() => handleChangeQuantityPositive()}>+</button>
            </section>
          </section>
        </section>
        <section className={styles.pedido}>
          <h1>Total do pedido</h1>
          <p>
            <span>R$</span> {price}
          </p>
        </section>
        <button className={styles.productActions} onClick={redirectWhatsapp}>
          <section className={styles.text}>Pedir no WhatsApp</section>
          <section>
            <AiOutlineWhatsApp color="#fff" size={24} />
          </section>
        </button>
      </section>
    </div>
  );
}
