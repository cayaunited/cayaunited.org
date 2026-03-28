import { DoorOpenIcon, HandHelpingIcon, HealthIcon, Rocket01Icon, SunriseIcon, UserGroupIcon, WalkingIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Box, Button, Container, Grid, GridCol, Group, Image, rem, Space, Text, Title } from '@mantine/core'

import MissionVisionSection from '@/components/MissionVisionSection/MissionVisionSection'

import classes from './page.module.css'

const gradientProps = {
  variant: 'gradient',
  gradient: { from: 'blue', to: 'green', deg: 45 },
}

export default function Page() {
  const missionCards = [
    {
      title: 'Welcome People',
      icon: DoorOpenIcon,
      description: <>
        <Text mb="md">Everyone is uniquely gifted with different personalities, backgrounds, experience levels, interests, skills, and more.</Text>
        <Text mb="md">We seek to create a learning community that recognizes the differences people have, and welcome them in as they are.</Text>
        <Text>Practically, that means teaching in a way that meets people where they are, regardless of prior knowledge or experience, and teaches them in a way they can understand.</Text>
      </>,
    },
    {
      title: 'Cross Barriers',
      icon: UserGroupIcon,
      description: <>
        <Text mb="md">There are many barriers that divide people in education, including finances, prior knowledge, learning styles, and more.</Text>
        <Text mb="md">We seek to cross those barriers to bring people the help they need in education.</Text>
        <Text>We do this by providing free material to learn game development, without assuming prior knowledge, using both textbook-style and video content.</Text>
      </>,
    },
    {
      title: 'Walk With',
      icon: WalkingIcon,
      description: <>
        <Text mb="md">It can sometimes seem lonely on the learning journey in education. Sometimes it can feel like you are left behind or forgotten.</Text>
        <Text mb="md">We recognize that, and wish to help change that. We believe all should feel seen, heard, known, and loved.</Text>
        <Text>That's why we seek to teach at a patient pace, encouraging asking questions and answering any you may have along the way, walking with you on your journey.</Text>
      </>,
    },
  ]
  
  const visionCards = [
    {
      title: 'Help For Today',
      icon: HandHelpingIcon,
      description: <>
        <Text mb="md">We're all in need of help some days. That looks different from person to person, but we can't do everything ourselves, and we can't do life alone.</Text>
        <Text mb="md">There is no one solution that works for everyone when it comes to the problems we face.</Text>
        <Text>We seek to listen to our community, adapt to their educational needs, and make sure they understand the content well.</Text>
      </>,
    },
    {
      title: 'Healing From Yesterday',
      icon: HealthIcon,
      description: <>
        <Text mb="md">Everyone battles the past, and the past often has an impact on who we are today, whether for better or for worse.</Text>
        <Text mb="md">When it comes to education, that can often lead to increased anxiety, needing to unlearn bad things, and sometimes feeling stuck.</Text>
        <Text>It doesn't have to stay that way, however. We seek to help reduce anxiety, teach good things, and help you become unstuck.</Text>
      </>,
    },
    {
      title: 'Hope For Tomorrow',
      icon: SunriseIcon,
      description: <>
        <Text mb="md">There are days that we are just living in the moment, trying to make it to the next one. However, we weren't meant to always be in that state.</Text>
        <Text mb="md">The truth is, we can have joy today and hope for tomorrow. We can live moment to moment and thrive, instead of just surviving.</Text>
        <Text>While we may not be able to change your circumstances, we can help change your mindset in spite of those circumstances, making your learning journey and life better.</Text>
      </>,
    },
  ]
  
  return <Container size="lg">
    <Box className={classes.hero} mt="-1rem">
      <Grid gap="xl" className={classes['hero-grid']} align="center">
        <GridCol span={{ base: 12, sm: 6 }} order={{ base: 1, sm: 2 }}>
          <Image
            src="/logo.svg"
            alt="CAYA United's logo: A simple butterfly with a gradient going from blue in the bottom left to green in the top right"
            maw={rem(384)}
            ml="auto"
            mr={{ base: 'auto', sm: 0 }}
          />
        </GridCol>
        <GridCol span={{ base: 12, sm: 6 }} order={{ base: 2, sm: 1 }}>
          <Text fz="h2" mb="xl">
            <Text span fw="bold" fz="inherit" {...gradientProps}>
              Come as you are
            </Text>
            ,
            <br />
            develop better,
            <br />
            game better,
            <br />
            become better,
            <br />
            <Text span fw="bold" fz="inherit" {...gradientProps}>
              united as one
            </Text>
            .
          </Text>
          <Title order={1} mb="xl">
            Welcome,
            <br />
            to&nbsp;
            <Text span fz="inherit" {...gradientProps}>
              CAYA United
            </Text>
            .
          </Title>
          <Group>
            <Button c="black" size="md" {...gradientProps} rightSection={<HugeiconsIcon icon={Rocket01Icon} />}>Start Your Journey</Button>
          </Group>
        </GridCol>
      </Grid>
    </Box>
    
    <Box className={classes.hero} mb="-1rem">
      <MissionVisionSection
        title="Mission"
        description="Welcome people in as they are, cross dividing barriers, and walk with them on their transformative journey to become the beautiful masterpieces they were made to be."
        cards={missionCards}
        color="blue"
      />
      <Space my="xl" />
      <MissionVisionSection
        title="Vision"
        description="Bring people the help they need for today, the healing they need from yesterday, and the hope they need for tomorrow."
        cards={visionCards}
        color="green"
      />
    </Box>
  </Container>
}
