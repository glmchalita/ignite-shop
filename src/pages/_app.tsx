import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'

import logoImg from '@/assets/logo.svg'
import CartDialog from '@/components/cart-dialog'
import store from '@/store'
import { globalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app'
import { ShoppingBag } from 'lucide-react'

globalStyles()

export const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noLayoutPaths = ['/sucess']

  const isNoLayout = noLayoutPaths.includes(router.pathname)

  return (
    <Provider store={store}>
      {isNoLayout ? (
        <div className={roboto.className}>
          <Component {...pageProps} />
        </div>
      ) : (
        <Container className={roboto.className}>
          <Header>
            <Link href="/">
              <Image src={logoImg} alt="Logo" />
            </Link>

            <CartDialog>
              <button>
                <ShoppingBag size={24} color="#8D8D99" />
              </button>
            </CartDialog>
          </Header>

          <Component {...pageProps} />
        </Container>
      )}
    </Provider>
  )
}
