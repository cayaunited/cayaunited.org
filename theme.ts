'use client'

import { Container, createTheme, CSSVariablesResolver } from '@mantine/core'
import { Lexend, Righteous } from 'next/font/google'

const lexend = Lexend({
  subsets: ['latin'],
})

const righteous = Righteous({
  subsets: ['latin'],
  weight: '400',
})

export const theme = createTheme({
  respectReducedMotion: true,
  fontFamily: lexend.style.fontFamily,
  headings: { fontFamily: righteous.style.fontFamily, fontWeight: 'normal' },
  defaultRadius: 'lg',
  primaryColor: 'green',
  primaryShade: { dark: 4, light: 5 },
  
  colors: {
    dark: [
      '#DADCDF',
      '#8F979F',
      '#7C8690',
      '#6B757E',
      '#5B636B',
      '#4B5259',
      '#3B4146',
      '#2C2F33',
      '#1C1E20',
      '#0B0C0D',
    ],
    green: [
      '#DBFFF0',
      '#B6FFE1',
      '#92FFD1',
      '#00B66A',
      '#00FF95',
      '#00ED8A',
      '#00DB80',
      '#00C875',
      '#00B66A',
      '#00A460',
    ],
    blue: [
      '#DBF3FF',
      '#B6E7FF',
      '#92DBFF',
      '#6DCEFF',
      '#00AAFF',
      '#009EED',
      '#0092DB',
      '#0086C8',
      '#0079B6',
      '#006DA4',
    ],
  },
  
  components: {
    Container: Container.extend({ defaultProps: { px: 0 } })
  },
})

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    
  },
  light: {
    
  },
  dark: {
    '--mantine-color-body': 'var(--mantine-color-dark-9)',
    '--mantine-color-green-outline': 'var(--mantine-color-green-4)',
    '--mantine-color-green-outline-hover': 'rgb(0, 255, 149, 0.05)',
    '--mantine-color-blue-outline': 'var(--mantine-color-blue-4)',
    '--mantine-color-blue-outline-hover': 'rgb(0, 170, 255, 0.05)',
  },
})
