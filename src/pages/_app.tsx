import '../styles/globals.scss';
import { Provider as NextAuthProvider } from 'next-auth/client';
import type { AppProps } from 'next/app';

import { CartProvider } from '../hooks/useCart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </NextAuthProvider>
  );
}
export default MyApp;
