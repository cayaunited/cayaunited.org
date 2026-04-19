'use client'

import { Button, Container, createTheme, CSSVariablesResolver, Divider } from '@mantine/core'
import { CodeHighlight, CodeHighlightAdapter, stripShikiCodeBlocks } from '@mantine/code-highlight'
import { Atkinson_Hyperlegible_Mono, Lexend, Righteous } from 'next/font/google'

import classes from '@/common.module.css'
import { BundledLanguage, BundledTheme, CodeToHastOptions } from 'shiki'

const lexend = Lexend({ subsets: ['latin'] })

export const righteous = Righteous({
  subsets: ['latin'],
  weight: '400',
})

const atkinson = Atkinson_Hyperlegible_Mono({ subsets: ['latin'] })

export const theme = createTheme({
  respectReducedMotion: true,
  fontFamily: lexend.style.fontFamily,
  fontFamilyMonospace: atkinson.style.fontFamily,
  headings: { fontFamily: lexend.style.fontFamily, fontWeight: 'normal' },
  defaultRadius: 'lg',
  autoContrast: true,
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
    Button: Button.extend({ defaultProps: { fw: 400 } }),
    CodeHighlight: CodeHighlight.extend({ defaultProps: { className: classes.code } }),
    Container: Container.extend({ defaultProps: { px: 0 } }),
    Divider: Divider.extend({ defaultProps: { size: 'sm' } })
  },
})

export const resolver: CSSVariablesResolver = () => ({
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

async function loadShiki() {
  const { createHighlighter } = await import('shiki')
  
  const shiki = await createHighlighter({
    langs: ['csharp'],
    themes: ['light-plus', 'dark-plus'],
  })
  
  return shiki
}

export const shikiAdapter: CodeHighlightAdapter = {
  loadContext: loadShiki,
  getHighlighter: (ctx) => {
    if (!ctx) return ({ code }) => ({ highlightedCode: code, isHighlighted: false })
    
    return ({ code, language, colorScheme }) => ({
      isHighlighted: true,
      highlightedCode: stripShikiCodeBlocks(
        ctx.codeToHtml(code, {
          lang: language,
          theme: colorScheme === 'light' ? 'light-plus' : 'dark-plus',
          colorReplacements: {
            'dark-plus': {
              '#c586c0': '#e3bdff',
              '#4ec9b0': '#80ffca',
              '#569cd6': '#80d4ff',
              '#9cdcfe': '#dadcdf',
              '#dcdcaa': '#ffffbf',
              '#b5cea8': '#ffbf80',
              '#808080': '#afb1b3',
              '#6a9955': '#afb1b3',
              '#cd9178': '#e3cbaa',
            },
          },
        } as CodeToHastOptions<BundledLanguage, BundledTheme>)
      ),
    })
  },
}
