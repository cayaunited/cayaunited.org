import { Atkinson_Hyperlegible_Mono, Atkinson_Hyperlegible_Next, Lexend, Righteous } from 'next/font/google'
import localFont from 'next/font/local'

export const lexend = Lexend({ subsets: ['latin'] })

export const righteous = Righteous({
  subsets: ['latin'],
  weight: '400',
})

export const atkinson = Atkinson_Hyperlegible_Next({ subsets: ['latin'] })
export const atkinsonMono = Atkinson_Hyperlegible_Mono({ subsets: ['latin'] })

export const openDyslexic = localFont({
  src: [
    {
      path: './public/OpenDyslexic/OpenDyslexic-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './public/OpenDyslexic/OpenDyslexic-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ]
})

export const fontMapping = {
  lexend: { name: 'Lexend', font: lexend },
  atkinson: { name: 'Atkinson Hyperlegible', font: atkinson },
  openDyslexic: { name: 'Open Dyslexic', font: openDyslexic },
}
