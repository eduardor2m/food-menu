import { createContext, ReactNode, useContext, useState } from 'react';

interface CartItem {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

interface CartContextData {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  allCartItems: () => CartItem[];
  getTotalPrice: () => number;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('@FoodMenu:cart');

      if (cart) {
        return JSON.parse(cart);
      }

      return [];
    } else {
      return [];
    }
  });

  function addToCart(item: CartItem) {
    try {
      if (cart.length > 0) {
        const itemExists = cart.find((cartItem) => cartItem.id === item.id);

        if (itemExists) {
          itemExists.quantity += item.quantity;
          setCart([...cart]);
          localStorage.setItem('@FoodMenu:cart', JSON.stringify([...cart]));
        } else {
          setCart([...cart, item]);
          localStorage.setItem(
            '@FoodMenu:cart',
            JSON.stringify([...cart, item])
          );
        }
      } else {
        setCart([{ ...item }]);
        localStorage.setItem('@FoodMenu:cart', JSON.stringify([{ ...item }]));
      }
      alert('Produto adicionado ao carrinho');
    } catch (e) {
      alert('Não foi possivel adicionar o produto ao carrinho');
    }
  }

  function removeFromCart(id: number) {
    try {
      const productIndex = cart.findIndex((p) => p.id === id);

      if (productIndex >= 0) {
        const newCart = [...cart];

        newCart.splice(productIndex, 1);

        setCart(newCart);
        localStorage.setItem('@FoodMenu:cart', JSON.stringify(newCart));
      }
    } catch (e) {
      alert('Não foi possivel remover o produto do carrinho');
    }
  }

  function getTotalPrice() {
    return cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }

  function allCartItems() {
    return cart;
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem('@FoodMenu:cart');
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        allCartItems,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
