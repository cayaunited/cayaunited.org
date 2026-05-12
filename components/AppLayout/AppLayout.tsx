'use client'

import { Anchor, AppShell, Box, Burger, Button, Group, Image, NavLink, rem, Text, useMatches } from '@mantine/core'
import { CodeHighlightAdapterProvider } from '@mantine/code-highlight'
import { useDisclosure, useHeadroom, useReducedMotion } from '@mantine/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'

import { righteous } from '@/fonts'
import { shikiAdapter } from '@/theme'
import { CourseLinkMetadata } from '@/utilities/types'

import CustomizationMenu from './CustomizationMenu/CustomizationMenu'
import classes from './AppLayout.module.css'

export default function AppLayout({ children, courseLinks }: { children: ReactNode, courseLinks: CourseLinkMetadata[] }) {
  const { pinned: isHeaderVisible } = useHeadroom({ scrollDistance: 50 })
  const shouldPinHeader = useMatches({ base: true, sm: false })
  const [isNavigationOpened, { toggle: toggleNavigation, close: closeNavigation }] = useDisclosure()
  const footerHeight = useMatches({ base: 'calc(120px - 0.125rem)', sm: 'calc(60px - 0.125rem)' })
  const reduceMotion = useReducedMotion()
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
      transitionDuration={reduceMotion ? 0 : 200}
      padding="md"
    >
      <Anchor href="#main" className={classes['skip-link']}>Skip to main content</Anchor>
      
      <AppShell.Header style={{ borderBottomWidth: '0.125rem' }}>
        <Group className={classes.header} justify="space-between">
          <Group>
            <Link href="/" role="link" aria-label="Home page" className={classes.logo}>
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
          <Group gap={0} h="100%">
            {
              courseLinks.map((link) => (
                <Button
                  key={link.url}
                  component={Link}
                  href={link.url}
                  role="link"
                  visibleFrom="sm"
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
            <CustomizationMenu />
            <Burger
              opened={isNavigationOpened}
              onClick={toggleNavigation}
              aria-label="Toggle navigation"
              hiddenFrom="sm"
              size="sm"
              mr="md"
              transitionDuration={reduceMotion ? 0 : 300}
            />
          </Group>
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
              tabIndex={isNavigationOpened ? 0 : -1}
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
                  tabIndex={isNavigationOpened ? 0 : -1}
                />
              ))}
            </NavLink>
          ))
        }
      </AppShell.Navbar>
      
      <AppShell.Main id="main">
        <Box mih={`calc(100vh - 60px - ${footerHeight} - 1rem)`} pb="md">
          {children}
        </Box>
        
        <Box className={classes.footer} h={footerHeight}>
          <Text>
            Drawings by{' '}<Anchor component={Link} href="https://roguerobin.com/" target="_blank">Rogue Robin Studios</Anchor>, game audio by{' '}<Anchor component={Link} href="https://x.com/felxlamp" target="_blank">Felx Lamp</Anchor>, and chalkboard texture by{' '}<Anchor component={Link} href="https://www.publicdomainpictures.net/en/view-image.php?image=100777" target="_blank">Karen Arnold</Anchor>
          </Text>
        </Box>
      </AppShell.Main>
    </AppShell>
  </CodeHighlightAdapterProvider>
}
