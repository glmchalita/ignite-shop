import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

import { stripe } from '@/lib/stripe'
import 'keen-slider/keen-slider.min.css'
import { HomeContainer, Product } from '@/styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import { ShoppingBag } from 'lucide-react'
import Stripe from 'stripe'

interface HomeProps {
  products: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    mode: 'snap',
    slides: {
      perView: 'auto',
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
              className="keen-slider__slide"
              passHref
            >
              <Image src={product.imageUrl} width={520} height={480} alt="Camiseta 1" />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <button>
                  <ShoppingBag size={32} color="white" />
                </button>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    const unitAmount = price.unit_amount ?? 0

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(unitAmount / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours,
  }
}
