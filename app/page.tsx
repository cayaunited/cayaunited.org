import { Container, Image, Text, Title } from '@mantine/core'

export default function Page() {
  return <Container>
    <Image src="/logo.svg" alt="CAYA United's logo: A simple butterfly with a gradient going from blue in the bottom left to green in the top right" />
    <Title order={1}>CAYA United</Title>
    <Text>Come as you are <strong>today</strong>, united for a better <strong>tomorrow</strong>.</Text>
    <Title order={2}>Mission</Title>
    <Title order={3}>Welcome People</Title>
    <Title order={3}>Cross Barriers</Title>
    <Title order={3}>Walk With</Title>
    <Title order={2}>Vision</Title>
    <Title order={3}>Help For Today</Title>
    <Title order={3}>Healing From Yesterday</Title>
    <Title order={3}>Hope For Tomorrow</Title>
  </Container>
}
