'use client'

import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Grid, Card, Title, Group, Text } from '@mantine/core'
import { motion } from 'motion/react'
import { ReactNode } from 'react'

import classes from '@/common.module.css'

export default function MissionVisionSection({ title, description, color, cards }:
  { title: string, description: string, color: string, cards: { title: string, icon: IconSvgElement, description: ReactNode }[] }) {
  return <>
    <Title order={2} c={color} mb="md">{title}</Title>
    <Text className={classes['text-wrap-pretty']} mb="md">{description}</Text>
    <Grid align="stretch">
      {
        cards.map((card, i) => (
          <Grid.Col key={card.title} span={{ base: 12, md: 4 }}>
            <Card
              component={motion.div}
              h="100%"
              className={classes['text-wrap-pretty']}
              initial={{ opacity: 0, translateX: '-1rem' }}
              whileInView={{ opacity: 1, translateX: '0' }}
              transition={{ delay: 0.25 * i, duration: 0.25 }}
              viewport={{ once: true }}
            >
              <Group justify="space-between" align="center" mb="md">
                <Title order={3}>{card.title}</Title>
                <HugeiconsIcon icon={card.icon} size="3rem" color={`var(--mantine-color-${color}-text)`} aria-hidden />
              </Group>
              {card.description}
            </Card>
          </Grid.Col>
        ))
      }
    </Grid>
  </>
}
