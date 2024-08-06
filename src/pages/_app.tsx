import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import logoImg from '@/assets/logo.svg'
import Image from "next/image";
import { Container, Header } from "@/styles/pages/app";
import {Roboto} from 'next/font/google'

globalStyles()

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={roboto.className}>
      <Header>
        <Image src={logoImg} alt="Logo" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
