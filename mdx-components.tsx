import { CodeHighlight } from '@mantine/code-highlight'
import { Anchor, AnchorProps, Divider, Image, ImageProps, List, ListItem, Text, Title } from '@mantine/core'
import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  h1: ({ children }) => <Title order={1} mb="xs">{children}</Title>,
  h2: ({ children }) => <Title order={2} mb="xs">{children}</Title>,
  h3: ({ children }) => <Title order={3} mb="xs">{children}</Title>,
  h4: ({ children }) => <Title order={4} mb="xs">{children}</Title>,
  h5: ({ children }) => <Title order={5} mb="xs">{children}</Title>,
  h6: ({ children }) => <Title order={6} mb="xs">{children}</Title>,
  p: ({ children }) => <Text mb="var(--paragraph-bottom-margin)">{children}</Text>,
  a: (props) => <Anchor href={props.href} target="_blank" {...(props as AnchorProps)} />,
  // eslint-disable-next-line jsx-a11y/alt-text
  img: (props) => <Image mb="md" {...(props as ImageProps)} />,
  hr: () => <Divider mb="md" />,
  ul: ({ children }) => <List type="unordered" mb="md">{children}</List>,
  ol: ({ children }) => <List type="ordered" mb="md">{children}</List>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  code: ({ children, className }) => <CodeHighlight
    code={children}
    language={className.slice(9)}
    radius="var(--mantine-radius-default)"
    withExpandButton
    defaultExpanded={true}
    mb="md"
  />,
}

export function useMDXComponents(): MDXComponents {
  return components
}
