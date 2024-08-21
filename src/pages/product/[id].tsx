import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import CartDialog from '@/components/cart-dialog'
import { stripe } from '@/lib/stripe'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/slices/cartSlice'
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import Stripe from 'stripe'

interface ProductProps {
  product: {
    name: string
    description: string | null
    imageUrl: string
    defaultPriceId: string
    price: number
    formattedPrice: string
  }
}

export default function Product({ product }: ProductProps) {
  // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
  //   useState<boolean>(false)
  const { isFallback } = useRouter()

  const dispatch = useAppDispatch()

  if (isFallback) {
    return <p>Loading...</p>
  }

  // async function handleBuyProduct() {
  //   try {
  //     setIsCreatingCheckoutSession(true)
  //     const response = await axios.post('/api/checkout', {
  //       priceId: product.defaultPriceId
  //     })

  //     const {checkoutUrl} = response.data

  //     window.location.href = checkoutUrl
  //   } catch (error) {
  //     // Conectar com uma ferramente de observabilidade (Datadog / Sentry)
  //     setIsCreatingCheckoutSession(false)
  //     alert('Falha ao redirecionar ao checkout!')
  //   }
  // }

  function handleAddToCart() {
    dispatch(
      addToCart({
        priceId: product.defaultPriceId,
        price: product.price,
        formattedPrice: product.formattedPrice,
        name: product.name,
        imageUrl: product.imageUrl,
        quantity: 1,
      }),
    )
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>{product.description}</p>

          <CartDialog>
            <button onClick={handleAddToCart}>Colocar na sacola</button>
          </CartDialog>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_QaHiHplrriLXxv' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ProductProps, { id: string }> = async ({ params }) => {
  try {
    const productId = params?.id

    if (!productId) {
      return {
        notFound: true,
      }
    }

    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price
    const unitAmount = price.unit_amount ?? 0

    return {
      props: {
        product: {
          name: product.name,
          description: product.description,
          imageUrl: product.images[0],
          defaultPriceId: price.id,
          price: unitAmount,
          formattedPrice: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(unitAmount / 100),
        },
      },
      revalidate: 60 * 60 * 1, // 1 hour
    }
  } catch (error) {
    console.error('Error in getStaticPros:', error)
    return {
      notFound: true,
    }
  }
}
