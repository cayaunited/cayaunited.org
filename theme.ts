'use client'

import { Anchor, Container, createTheme, Divider, Input, NavLink, NumberInput, Radio } from '@mantine/core'
import { CodeHighlight, CodeHighlightAdapter, stripShikiCodeBlocks } from '@mantine/code-highlight'
import { BundledLanguage, BundledTheme, CodeToHastOptions } from 'shiki'

import { atkinsonMono } from '@/fonts'

import classes from '@/common.module.css'

export const theme = createTheme({
  respectReducedMotion: true,
  fontFamilyMonospace: atkinsonMono.style.fontFamily,
  defaultRadius: 'md',
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
    Anchor: Anchor.extend({ defaultProps: { td: 'underline' } }),
    CodeHighlight: CodeHighlight.extend({ defaultProps: { className: classes.code } }),
    Container: Container.extend({ defaultProps: { px: 0 } }),
    Divider: Divider.extend({ defaultProps: { size: 'sm' } }),
    Input: Input.extend({ classNames: { input: classes.input } }),
    NavLink: NavLink.extend({ classNames: { label: classes['input-label'] }, defaultProps: { variant: 'subtle' } }),
    NumberInput: NumberInput.extend({ classNames: { input: classes.input, control: classes['number-control'], label: classes['input-label'] } }),
    Radio: Radio.extend({ classNames: { inner: classes.radio, label: classes['input-label'] } })
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
