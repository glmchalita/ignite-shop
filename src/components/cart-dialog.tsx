import Image from 'next/image'
import { ReactNode, useState } from 'react'

import { roboto } from '@/pages/_app'
import { totalQtyCart, totalValueCart, useAppDispatch, useAppSelector } from '@/store/hooks'
import { addItemQty, removeFromCart, subtractItemQty } from '@/store/slices/cartSlice'
import {
  Container,
  DialogClose,
  DialogContent,
  EmptyCart,
  Footer,
  ImageContainer,
  ProductCard,
  ProductControls,
} from '@/styles/components/cart-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'

interface CartDialogProps {
  children: ReactNode
}

export default function CartDialog({ children }: CartDialogProps) {
  const [open, setOpen] = useState(false)
  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const isCartEmpy = !(cart.length > 0)
  const totalQty = useAppSelector(totalQtyCart)
  const totalValue = useAppSelector(totalValueCart)

  function handleCloseDialog() {
    setOpen(false)
  }

  function handleRemoveFromCart(priceId: string) {
    return () => dispatch(removeFromCart(priceId))
  }

  function handleSubtractItemQty(priceId: string) {
    return () => dispatch(subtractItemQty(priceId))
  }

  function handleAddItemQty(priceId: string) {
    return () => dispatch(addItemQty(priceId))
  }

  async function handleCheckout() {
    try {
      const checkoutCart = cart.map(({ priceId, quantity }) => ({
        priceId,
        quantity,
      }))

      const response = await axios.post('/api/checkout', {
        cart: checkoutCart,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      alert('Falha ao redirecionar ao checkout')
      console.error(error)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <DialogContent className={roboto.className} asChild forceMount>
              <motion.div
                initial={{ opacity: 0.5, x: 400 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DialogClose>
                  <X size={24} />
                </DialogClose>

                <VisuallyHidden>
                  <Dialog.Title>Sacola de compras</Dialog.Title>
                  <Dialog.Description aria-describedby={undefined}></Dialog.Description>
                </VisuallyHidden>

                <Container>
                  {isCartEmpy ? (
                    <EmptyCart>
                      <h2>Sacola de compras vazia</h2>
                      <ShoppingBag size={64} />
                      <button onClick={handleCloseDialog}>Voltar</button>
                    </EmptyCart>
                  ) : (
                    <>
                      <h2>Sacola de compras</h2>

                      <div>
                        {cart.map((item) => {
                          const isMaxLimitReached = item.quantity > 9

                          return (
                            <ProductCard key={item.priceId}>
                              <ImageContainer>
                                <Image src={item.imageUrl} width={100} height={95} alt="" />
                              </ImageContainer>

                              <div>
                                <h3>{item.name}</h3>
                                <div>
                                  <strong>{item.formattedPrice}</strong>

                                  <ProductControls>
                                    <button onClick={handleSubtractItemQty(item.priceId)}>
                                      <Minus size={12} />
                                    </button>
                                    <span>{item.quantity.toFixed(0).padStart(2, '0')}</span>
                                    <button
                                      onClick={handleAddItemQty(item.priceId)}
                                      disabled={isMaxLimitReached}
                                    >
                                      <Plus size={12} />
                                    </button>
                                  </ProductControls>
                                </div>

                                <button onClick={handleRemoveFromCart(item.priceId)}>
                                  Remover
                                </button>
                              </div>
                            </ProductCard>
                          )
                        })}
                      </div>

                      <Footer>
                        <div>
                          <p>
                            Quantidade <span>{totalQty} itens</span>
                          </p>
                          <p>
                            Valor total
                            <span>{totalValue}</span>
                          </p>
                        </div>

                        <button onClick={handleCheckout}>Finalizar compra</button>
                      </Footer>
                    </>
                  )}
                </Container>
              </motion.div>
            </DialogContent>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
