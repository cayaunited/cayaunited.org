'use client'

import { ActionIcon, Button, Checkbox, createTheme, CSSVariablesResolver, InputLabel, ModalHeader, Text, Title } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

import { fontMapping } from '@/fonts'
import { theme } from '@/theme'

import classes from '@/common.module.css'

export default function useDynamicTheme() {
  const [fontFamily, setFontFamily] = useLocalStorage({
    key: 'font-family',
    defaultValue: 'lexend',
  })
  
  const [lineSpacing, setLineSpacing] = useLocalStorage({
    key: 'line-spacing',
    defaultValue: 1.5,
  })
  
  const [letterSpacing, setLetterSpacing] = useLocalStorage({
    key: 'letter-spacing',
    defaultValue: 0.12,
  })
  
  const [wordSpacing, setWordSpacing] = useLocalStorage({
    key: 'word-spacing',
    defaultValue: 0.16,
  })
  
  const [paragraphSpacing, setParagraphSpacing] = useLocalStorage({
    key: 'paragraph-spacing',
    defaultValue: 2,
  })
  
  const font = fontMapping[fontFamily as keyof(typeof fontMapping)].font
  
  const textStyle = {
    lineHeight: lineSpacing,
    letterSpacing: `${letterSpacing}em`,
    wordSpacing: `${wordSpacing}em`,
  }
  
  return {
    fontFamily,
    setFontFamily,
    lineSpacing,
    setLineSpacing,
    letterSpacing,
    setLetterSpacing,
    wordSpacing,
    setWordSpacing,
    paragraphSpacing,
    setParagraphSpacing,
    
    font,
    textStyle,
    
    theme: createTheme({
      ...theme,
      fontFamily: font.style.fontFamily,
      headings: { fontFamily: font.style.fontFamily },
      components: {
        ...theme.components,
        ActionIcon: ActionIcon.extend({ defaultProps: { className: classes['action-icon'] } }),
        Button: Button.extend({ defaultProps: { className: classes.button, style: { ...textStyle, fontWeight: 400, fontSize: '1rem' } } }),
        Checkbox: Checkbox.extend({ classNames: { input: classes.input, label: classes['input-label']}, defaultProps: { style: textStyle } }),
        InputLabel: InputLabel.extend({ defaultProps: { style: textStyle, mb: 'xs' } }),
        ModalHeader: ModalHeader.extend({ defaultProps: { style: { ...textStyle, fontWeight: 'bold' } } }),
        Text: Text.extend({ defaultProps: { style: textStyle, fz: 'md' } }),
        Title: Title.extend({ defaultProps: { style: textStyle } }),
      },
    }),
    
    resolver: (() => ({
      variables: {
        '--paragraph-bottom-margin': `${paragraphSpacing}em`,
      },
      light: {
        '--mantine-color-body': 'var(--mantine-color-gray-2)',
        '--mantine-color-green-filled': 'var(--mantine-color-green-6)',
        '--mantine-color-green-filled-hover': 'var(--mantine-color-green-7)',
        '--mantine-color-green-outline': 'var(--mantine-color-green-4)',
        '--mantine-color-green-outline-hover': 'rgb(0, 255, 149, 0.05)',
        '--mantine-color-green-text': 'var(--mantine-color-green-8)',
        '--mantine-color-anchor': 'var(--mantine-color-green-8)',
        '--mantine-color-green-light-hover': 'var(--mantine-color-gray-0)',
        '--mantine-color-green-light-color': 'var(--mantine-color-green-8)',
        '--mantine-color-blue-outline': 'var(--mantine-color-blue-4)',
        '--mantine-color-blue-outline-hover': 'rgb(0, 170, 255, 0.05)',
        '--mantine-color-blue-light-hover': 'var(--mantine-color-gray-0)',
        '--mantine-color-blue-light-color': 'var(--mantine-color-blue-5)',
        '--mantine-color-gray-light-hover': 'var(--mantine-color-gray-1)',
      },
      dark: {
        '--mantine-color-body': 'var(--mantine-color-dark-9)',
        '--mantine-color-green-filled': 'var(--mantine-color-green-6)',
        '--mantine-color-green-filled-hover': 'var(--mantine-color-green-7)',
        '--mantine-color-green-outline': 'var(--mantine-color-green-4)',
        '--mantine-color-green-outline-hover': 'rgb(0, 255, 149, 0.05)',
        '--mantine-color-green-text': 'var(--mantine-color-green-6)',
        '--mantine-color-anchor': 'var(--mantine-color-green-6)',
        '--mantine-color-green-light-hover': 'var(--mantine-color-dark-6)',
        '--mantine-color-green-light-color': 'var(--mantine-color-green-7)',
        '--mantine-color-blue-outline': 'var(--mantine-color-blue-4)',
        '--mantine-color-blue-outline-hover': 'rgb(0, 170, 255, 0.05)',
        '--mantine-color-blue-light-hover': 'var(--mantine-color-dark-6)',
        '--mantine-color-blue-light-color': 'var(--mantine-color-blue-4)',
      },
    })) as CSSVariablesResolver
  }
}
