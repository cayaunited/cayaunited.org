'use client'

import { ArrowLeft02Icon, ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Group, Anchor, Text } from '@mantine/core'
import Link from 'next/link'

import { CourseMetadata, LessonMetadata } from '@/utilities/types'

import classes from './LessonFooter.module.css'

export default function LessonFooter({ course, lesson, previousLesson, nextLesson }:
  { course: CourseMetadata, lesson: LessonMetadata, previousLesson?: string, nextLesson?: string }) {
  const courseLink = course.link
  const { nextURL, previousURL } = lesson
  
  return <Group justify="space-between" align="center" mt={`calc(${previousURL || nextURL ? '1rem' : '0rem'} - var(--paragraph-bottom-margin))`}>
    {previousURL && (
      <Anchor component={Link} href={`${courseLink}/${previousURL}`} className={classes['lesson-link-left']}>
        <HugeiconsIcon icon={ArrowLeft02Icon} size="1rem" aria-hidden />
        <Text span>{previousLesson}</Text>
      </Anchor>
    )}
    {nextURL && (
      <Anchor component={Link} href={`${courseLink}/${nextURL}`} className={classes['lesson-link-right']}>
        <Text span>{nextLesson}</Text>
        <HugeiconsIcon icon={ArrowRight02Icon} size="1rem" aria-hidden />
      </Anchor>
    )}
  </Group>
}
