'use client'

import { AppShell, Burger, Button, Group, Image, NavLink, rem, Text, useMatches } from '@mantine/core'
import { useDisclosure, useHeadroom } from '@mantine/hooks'
import { MotionConfig } from 'motion/react'
import Link from 'next/link'
import { ReactNode } from 'react'

import classes from './AppLayout.module.css'

export default function AppLayout({ children }: { children: ReactNode }) {
  const { pinned: isHeaderVisible } = useHeadroom()
  const shouldPinHeader = useMatches({ base: true, sm: false })
  const [isNavigationOpened, { toggle: toggleNavigation }] = useDisclosure()
  
  const links = [
    {
      url: '/courses',
      label: 'Courses',
    },
    {
      url: '/ground-zero',
      label: 'Ground Zero',
    },
    {
      url: '/reprogram-your-soul',
      label: 'Reprogram Your Soul',
    },
  ]
  
  return <MotionConfig reducedMotion="user">
    <AppShell
      header={{ height: 60, collapsed: shouldPinHeader && !isHeaderVisible }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !isNavigationOpened } }}
      padding="md"
    >
      <AppShell.Header style={{ borderBottomWidth: '0.125rem' }}>
        <Group className={classes.header}>
          <Group>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="CAYA United's logo: A simple butterfly with a gradient going from blue in the bottom left to green in the top right"
                h={rem(24)}
              />
            </Link>
            <Text component={Link} href="/" span className={classes['header-name']}>
              CAYA United
            </Text>
          </Group>
          <Group gap={0} visibleFrom="sm" h="100%">
            {
              links.map((link) => (
                <Button
                  key={link.url}
                  component={Link}
                  href={link.url}
                  role="link"
                  variant="subtle"
                  className={classes['header-link']}
                  color="gray"
                  h="100%"
                  radius={0}
                >
                  {link.label}
                </Button>
              ))
            }
          </Group>
          <Burger opened={isNavigationOpened} onClick={toggleNavigation} hiddenFrom="sm" size="sm" mr="md" />
        </Group>
      </AppShell.Header>
      
      <AppShell.Navbar bd="none">
        {
          links.map((link) => (
            <NavLink key={link.url} component={Link} href={link.url} className={classes['navbar-link']} label={link.label} />
          ))
        }
      </AppShell.Navbar>
      
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  </MotionConfig>
}
