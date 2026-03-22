import '@mantine/core/styles.css'

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core'

import AppLayout from '@/components/AppLayout/AppLayout'

import { resolver, theme } from '../theme'

export const metadata = {
  title: 'CAYA United',
  description: 'Come as you are, develop better, game better, and become better, united as one.',
}

export default function RootLayout({ children }: { children: any }) {
  return <html lang="en" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript />
      <link rel="shortcut icon" href="/favicon.svg" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </head>
    <body>
      <MantineProvider
        defaultColorScheme="dark"
        theme={theme}
        cssVariablesResolver={resolver}
      >
        <AppLayout>{children}</AppLayout>
      </MantineProvider>
    </body>
  </html>
}
