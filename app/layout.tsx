import '@mantine/core/styles.css'

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core'
import { resolver, theme } from '../theme'

export const metadata = {
  title: 'CAYA United',
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
      >{children}</MantineProvider>
    </body>
  </html>
}
