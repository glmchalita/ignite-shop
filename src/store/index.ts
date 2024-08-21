import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '@/store/slices/cartSlice'

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
