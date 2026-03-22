'use client'

import { Grid, Transition, Card, Title, useMatches } from '@mantine/core'
import { useInViewport } from '@mantine/hooks'
import { JSX, useEffect, useState } from 'react'

import commonClasses from '@/common.module.css'

export default function MissionVisionSection({ cards }: { cards: { title: string, description: JSX.Element }[] }) {
  const { ref, inViewport } = useInViewport()
  const [wasInViewport, setWasInViewport] = useState(false)
  const delay = useMatches({ base: 0, md: 250 })
  
  useEffect(() => {
    if (!wasInViewport && inViewport) setWasInViewport(true)
  }, [wasInViewport, inViewport])
  
  return <Grid ref={ref} align="stretch">
    {
      cards.map((card, i) => (
        <Grid.Col key={card.title} span={{ base: 12, md: 4 }}>
          <Transition mounted={wasInViewport || delay === 0} transition="fade-down" enterDelay={delay * i} duration={delay}>
            {(transitionStyle) => (
              <Card h="100%" className={commonClasses['text-wrap-pretty']} style={{ ...transitionStyle }}>
                <Title order={3} mb="md">{card.title}</Title>
                {card.description}
              </Card>
            )}
          </Transition>
        </Grid.Col>
      ))
    }
  </Grid>
}
