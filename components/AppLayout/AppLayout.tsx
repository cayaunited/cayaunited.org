'use client'

import { AppShell, Burger, Button, Group, Image, NavLink, rem, Text, useMatches } from '@mantine/core'
import { CodeHighlightAdapterProvider } from '@mantine/code-highlight'
import { useDisclosure, useHeadroom } from '@mantine/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'

import { righteous, shikiAdapter } from '@/theme'
import { CourseLinkMetadata } from '@/utilities/types'

import classes from './AppLayout.module.css'

export default function AppLayout({ children, courseLinks }: { children: ReactNode, courseLinks: CourseLinkMetadata[] }) {
  const { pinned: isHeaderVisible } = useHeadroom()
  const shouldPinHeader = useMatches({ base: true, sm: false })
  const [isNavigationOpened, { toggle: toggleNavigation, close: closeNavigation }] = useDisclosure()
  const pathname = usePathname()
  const [previousPathname, setPreviousPathname] = useState(pathname)
  
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname)
    if (isNavigationOpened) closeNavigation()
  }
  
  return <CodeHighlightAdapterProvider adapter={shikiAdapter}>
    <AppShell
      header={{ height: 60, collapsed: shouldPinHeader && !isHeaderVisible }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !isNavigationOpened } }}
      padding="md"
    >
      <AppShell.Header style={{ borderBottomWidth: '0.125rem' }}>
        <Group className={classes.header} justify="space-between">
          <Group>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="CAYA United's logo: A simple butterfly with a gradient going from blue in the bottom left to green in the top right"
                h={rem(24)}
              />
            </Link>
            <Text component={Link} href="/" span className={`${classes['header-name']} ${righteous.className}`}>
              CAYA United
            </Text>
          </Group>
          <Group gap={0} visibleFrom="sm" h="100%">
            {
              courseLinks.map((link) => (
                <Button
                  key={link.url}
                  component={Link}
                  href={link.url}
                  role="link"
                  variant="subtle"
                  className={classes['header-link']}
                  color="gray"
                  c={pathname.startsWith(link.url) ? 'green' : undefined}
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
          courseLinks.map((courseLink) => (
            <NavLink
              key={courseLink.url}
              component={Link}
              href={courseLink.url}
              className={classes['navbar-link']}
              label={courseLink.label}
              active={pathname.startsWith(courseLink.url)}
            >
              {courseLink.lessonLinks.length > 0 && courseLink.lessonLinks.map((lessonLink) => (
                <NavLink
                  key={lessonLink.url}
                  component={Link}
                  href={lessonLink.url}
                  className={classes['navbar-link']}
                  label={lessonLink.label}
                  active={pathname === lessonLink.url}
                  color="blue"
                />
              ))}
            </NavLink>
          ))
        }
      </AppShell.Navbar>
      
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  </CodeHighlightAdapterProvider>
}
