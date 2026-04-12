'use client'

import { Button, Card, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { LessonMetadata } from '@/utilities/types'

import classes from '@/common.module.css'

export default function LessonCard({ lesson }: { lesson: LessonMetadata & { url: string } }) {
  return <Card>
    <Title order={4}>{lesson.title}</Title>
    <Text mb="md" className={classes['text-wrap-pretty']}>{lesson.description}</Text>
    <Group>
      <Button
        component={Link}
        href={lesson.url}
        role="link"
      >
        Read
      </Button>
    </Group>
  </Card>
}
