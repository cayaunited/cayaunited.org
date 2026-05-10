'use client'

import { Grid, Card, Title, Group, Text, Stack, Image } from '@mantine/core'
import { ReactNode } from 'react'

import classes from '@/common.module.css'

export default function MissionVisionSection({ title, description, color, cards }:
  { title: string, description: string, color: string, cards: { title: string, imageURL: string, imageAltText: string, description: ReactNode }[] }) {
  return <>
    <Title order={2} c={color} mb="md">{title}</Title>
    <Text className={classes['text-wrap-pretty']} mb="md">{description}</Text>
    <Stack>
      {
        cards.map((card) => (
          <Card
            key={card.title}
            h="100%"
            p={0}
            className={classes['text-wrap-pretty']}
          >
            <Grid gap={0} align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Image src={card.imageURL} alt={card.imageAltText} />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }} p="md">
                <Group justify="space-between" align="center" mb="md">
                  <Title order={3}>{card.title}</Title>
                </Group>
                {card.description}
              </Grid.Col>
            </Grid>
          </Card>
        ))
      }
    </Stack>
  </>
}
