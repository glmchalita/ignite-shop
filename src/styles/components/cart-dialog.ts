import { styled } from '..'

import * as Dialog from '@radix-ui/react-dialog'

export const DialogContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100vh',
  maxWidth: '480px',
  width: '100%',

  boxShadow: '-10px 0 10px rgba(0, 0, 0, 0.1)',

  backgroundColor: '$grey800',
})

export const DialogClose = styled(Dialog.Close, {
  position: 'absolute',
  backgroundColor: 'transparent',
  border: 0,

  top: '1.5rem',
  right: '1.5rem',

  cursor: 'pointer',

  color: '$grey300',
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '4.5rem 3rem 3rem 3rem',

  h2: {
    fontSize: '$lg',
  },

  '> div': {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
})

export const ProductCard = styled('div', {
  display: 'flex',
  gap: '1.25rem',

  img: {
    borderRadius: 8,
  },

  '> div:nth-of-type(2)': {
    width: '100%',
    '> div': {
      marginTop: '0.25rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      // backgroundColor: 'red',
    },

    h3: {
      fontSize: '$md',
      color: '$grey300',
      lineHeight: '1.6',
    },

    strong: {
      fontSize: '$md',
      lineHeight: '1.6',
    },

    '> button': {
      color: '$green500',
      backgroundColor: 'transparent',
      lineHeight: '1.6',
      border: 0,
      fontWeight: 'bold',
      fontSize: '1rem',
      display: 'block',
      marginTop: '0.5rem',
      transition: '0.1s',
      cursor: 'pointer',

      '&:hover': {
        color: '$green300',
      },
    },
  },
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  lineHeight: 0,
  borderRadius: 8,
})

export const ProductControls = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  backgroundColor: '$grey900',
  color: '$green500',
  borderRadius: 6,

  fontWeight: 'bold',

  '> button': {
    border: 0,
    lineHeight: 0,
    backgroundColor: 'transparent',
    color: 'inherit',
    fontWeight: 'bold',
    padding: '0.5rem',
    cursor: 'pointer',

    '&:not(:disabled):hover': {
      backgroundColor: '#181C1F',
      borderRadius: 6,
    },

    '&:disabled': {
      cursor: 'default',
      borderRadius: 6,
      opacity: 0.5,
    },
  },

  span: {
    // padding: '0.25rem',
  },
})

export const Footer = styled('footer', {
  margin: '0 auto',
  marginTop: 'auto',
  width: '100%',

  p: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  'p:first-of-type': {
    span: {
      fontSize: '$md',
      color: '$grey300',
    },
  },

  'p:nth-of-type(2)': {
    marginTop: '0.5rem',
    fontSize: '$md',
    fontWeight: 'bold',

    span: {
      fontSize: '$xl',
    },
  },

  button: {
    backgroundColor: '$green500',
    width: '100%',
    border: 0,
    borderRadius: 8,

    marginTop: '3.5rem',
    padding: '1.25rem',

    fontSize: '$md',
    fontWeight: 'bold',
    color: '$white',

    cursor: 'pointer',
    transition: '0.1s',

    '&:hover': {
      backgroundColor: '$green300',
    },
  },
})

export const EmptyCart = styled('div', {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  h2: {
    fontSize: '$2xl',
  },

  button: {
    backgroundColor: '$green500',
    width: '100%',
    border: 0,
    borderRadius: 8,

    padding: '1.25rem',

    fontSize: '$md',
    fontWeight: 'bold',
    color: '$white',

    cursor: 'pointer',
    transition: '0.1s',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})
