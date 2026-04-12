'use client'

import { Anchor, Box, Image, rem, Text, Title } from '@mantine/core'
import Link from 'next/link'

import classes from './page.module.css'

export default function NotFound() {
  return <Box className={classes['hero-center']}>
    <Image
      src="/error.svg"
      alt="CAYA United's error logo: A simple butterfly with a gradient going from purple in the bottom left to red in the top right"
      maw={rem(384)}
      mb="md"
    />
    <Title order={1} ta="center" mb="md">Page Not Found</Title>
    <Text ta="center" mb="md">The page you are looking for doesn't exist.</Text>
    <Text ta="center">
      <Anchor component={Link} href="/">Home</Anchor>
      {' | '}
      <Anchor component={Link} href="/ground-zero">Ground Zero</Anchor>
    </Text>
  </Box>
}
