import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import logoImg from '@/assets/logo.svg'
import { stripe } from '@/lib/stripe'
import { ImageCard, ImageContainer, SucessContainer, SucessHeader } from '@/styles/pages/sucess'
import Stripe from 'stripe'

interface SucessProps {
  customerName: string
  products: {
    name: string
    imageUrl: string
  }[]
}

export default function Sucess({ customerName, products }: SucessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SucessHeader>
        <Link href="/">
          <Image src={logoImg} alt="Logo" />
        </Link>
      </SucessHeader>

      <SucessContainer>
        <ImageContainer>
          {products.map((product, index) => (
            <ImageCard key={product.name} style={index > 0 ? { marginLeft: -60 } : {}}>
              <Image src={product.imageUrl} width={140} height={140} alt="" />
            </ImageCard>
          ))}
        </ImageContainer>

        <h1>Compra efetuada!</h1>

        {products.length > 1 ? (
          <p>
            Uhuul <strong>{customerName}</strong>, sua compra de {products.length} camisetas já está
            a caminho da sua casa.
          </p>
        ) : (
          <p>
            Uhuul <strong>{customerName}</strong>, sua compra de <strong>{products[0].name}</strong>{' '}
            já está a caminho da sua casa.
          </p>
        )}

        <Link href="/">Voltar ao catálogo</Link>
      </SucessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  if (!session) {
    return {
      notFound: true,
    }
  }

  const customerName = session.customer_details?.name
  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      customerName,
      products,
    },
  }
}
