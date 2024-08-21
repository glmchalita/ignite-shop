import { createStitches } from '@stitches/react'

export const { config, styled, css, globalCss, keyframes, getCssText, theme, createTheme } =
  createStitches({
    theme: {
      colors: {
        white: '#fff',

        grey900: '#121214',
        grey800: '#202024',
        grey500: '#8d8d99',
        grey300: '#c4c4cc',
        grey100: '#e1e1e6',

        green500: '#00875f',
        green300: '#00b37e',
      },

      fontSizes: {
        md: '1.125rem', // 18px
        lg: '1.25rem', // 20px
        xl: '1.5rem', // 24px
        '2xl': '2rem', // 32px
      },
    },
  })
