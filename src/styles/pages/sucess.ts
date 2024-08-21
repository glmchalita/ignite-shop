import { styled } from '..'

export const SucessHeader = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '4rem',
})

export const SucessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    marginTop: '3rem',
    fontSize: '$2xl',
    color: '$grey100',
  },

  p: {
    fontSize: '$xl',
    color: '$grey300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    fontSize: '$lg',
    color: '$green500',
    display: 'block',
    marginTop: '5rem',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImageContainer = styled('div', {
  display: 'flex',
})

export const ImageCard = styled('div', {
  zIndex: 1,
  width: '100%',
  maxWidth: 130,
  height: 145,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',
  padding: '5rem',
  boxShadow: '-5px -5px 10px rgba(0, 0, 0, 0.2)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})
