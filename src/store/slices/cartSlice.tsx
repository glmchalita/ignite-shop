import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartState {
  priceId: string
  price: number
  formattedPrice: string
  imageUrl: string
  name: string
  quantity: number
}

const initialState: CartState[] = []

type CartPayload = CartState

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<CartPayload>) => {
      const itemAlreadyAdded = state.find((item) => item.priceId === payload.priceId)

      if (itemAlreadyAdded) {
        itemAlreadyAdded.quantity += 1
      } else {
        state.push(payload)
      }
    },
    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      const itemToRemove = state.findIndex((item) => item.priceId === payload)

      if (itemToRemove !== -1) {
        state.splice(itemToRemove, 1)
      }
    },
    subtractItemQty: (state, { payload }: PayloadAction<string>) => {
      const itemToSubtract = state.find((item) => item.priceId === payload)

      if (itemToSubtract) {
        if (itemToSubtract.quantity > 1) {
          itemToSubtract.quantity -= 1
        } else {
          const itemIndex = state.indexOf(itemToSubtract)
          state.splice(itemIndex, 1)
        }
      }
    },
    addItemQty: (state, { payload }: PayloadAction<string>) => {
      const itemToAdd = state.find((item) => item.priceId === payload)

      if (itemToAdd) {
        itemToAdd.quantity += 1
      }
    },
    clearCart: () => {
      return []
    },
  },
})

export default cartSlice.reducer
export const { addToCart, removeFromCart, subtractItemQty, addItemQty, clearCart } =
  cartSlice.actions
