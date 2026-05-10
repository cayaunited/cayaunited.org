'use client'

import { ArrowLeft02Icon, ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Group, Anchor, Text, Checkbox } from '@mantine/core'
import Link from 'next/link'

import { CourseMetadata, ExtendedLessonMetadata } from '@/utilities/types'
import useLessonCompleted from '@/utilities/useLessonCompleted'

import classes from './LessonFooter.module.css'

export default function LessonFooter({ course, lesson, previousLesson, nextLesson }:
  { course: CourseMetadata, lesson: ExtendedLessonMetadata, previousLesson?: string, nextLesson?: string }) {
  const courseLink = course.link
  const { courseID, lessonID, nextURL, previousURL } = lesson
  const { wasCompleted, toggleWasCompleted } = useLessonCompleted(courseID, lessonID)
  
  return <>
    <Checkbox
      label="Have you done this lesson?"
      color="blue"
      checked={wasCompleted}
      onChange={toggleWasCompleted}
    />
    <Group justify="space-between" align="center" mt={previousURL || nextURL ? 'md' : 0}>
      {previousURL && (
        <Anchor component={Link} href={`${courseLink}/${previousURL}`} className={classes['lesson-link-left']}>
          <HugeiconsIcon icon={ArrowLeft02Icon} size="2rem" aria-hidden />
          <Text span>{previousLesson}</Text>
        </Anchor>
      )}
      {nextURL && (
        <Anchor component={Link} href={`${courseLink}/${nextURL}`} className={classes['lesson-link-right']}>
          <Text span>{nextLesson}</Text>
          <HugeiconsIcon icon={ArrowRight02Icon} size="2rem" aria-hidden />
        </Anchor>
      )}
    </Group>
  </>
}
