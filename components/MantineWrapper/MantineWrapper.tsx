'use client'

import { MantineProvider } from '@mantine/core'
import { ReactNode } from 'react'

import useDynamicTheme from '@/utilities/useDynamicTheme'

export default function MantineWrapper({ children }: { children: ReactNode }) {
  const { theme, resolver } = useDynamicTheme()
  
  return <MantineProvider
    defaultColorScheme="auto"
    theme={theme}
    cssVariablesResolver={resolver}
  >
    {children}
  </MantineProvider>
}
