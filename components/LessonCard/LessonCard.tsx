'use client'

import { ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button, Card, Checkbox, Grid, Group, Image, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { ExtendedLessonMetadata } from '@/utilities/types'
import useLessonCompleted from '@/utilities/useLessonCompleted'

import classes from '@/common.module.css'

export default function LessonCard({ lesson }: { lesson: ExtendedLessonMetadata }) {
  const { wasCompleted, toggleWasCompleted } = useLessonCompleted(lesson.courseID, lesson.lessonID)
  
  return <Card p={0}>
    <Grid gap={0}>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Image src={lesson.thumbnailURL} alt={lesson.thumbnailAltText} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }} p="md">
        <Title order={4} mb="md" className={classes['text-wrap-pretty']}>{lesson.title}</Title>
        <Text mb="md" className={classes['text-wrap-pretty']}>{lesson.description}</Text>
        <Group mb="md">
          <Button
            component={Link}
            href={lesson.url}
            role="link"
            leftSection={<HugeiconsIcon icon={ViewIcon} aria-hidden />}
          >
            Read
          </Button>
        </Group>
        <Checkbox
          label="Have you done this lesson?"
          color="blue"
          checked={wasCompleted}
          onChange={toggleWasCompleted}
        />
      </Grid.Col>
    </Grid>
  </Card>
}
