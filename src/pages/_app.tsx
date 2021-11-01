import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import { CartProvider } from '../hooks/useCart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
export default MyApp;
