import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { createSelector } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from './'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const selectCartItems = (state: RootState) => state.cart

export const totalQtyCart = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
)

export const totalValueCart = createSelector(selectCartItems, (items) => {
  const totalValue = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalValue / 100)
})
