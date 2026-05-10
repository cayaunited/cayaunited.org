'use client'

import { Anchor, AspectRatio, Checkbox, Divider, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { CourseMetadata, ExtendedLessonMetadata } from '@/utilities/types'
import useLessonCompleted from '@/utilities/useLessonCompleted'

import classes from '@/common.module.css'

export default function LessonHeader({ course, lesson }: { course: CourseMetadata, lesson: ExtendedLessonMetadata }) {
  const { courseID, lessonID, title, description, lastUpdated, orderInCourse, videoURL } = lesson
  const { wasCompleted, toggleWasCompleted } = useLessonCompleted(courseID, lessonID)
  
  return <>
    <Title order={1}>{title}</Title>
    <Text size="xl" mb="md">
      Part {orderInCourse} of <Anchor component={Link} href={course.link}>{course.fullTitle}</Anchor>
    </Text>
    <Text mb="md">Last updated on {lastUpdated}</Text>
    <Text className={classes['text-wrap-pretty']} mb="md">{description}</Text>
    <Checkbox
      label="Have you done this lesson?"
      color="blue"
      mb="md"
      checked={wasCompleted}
      onChange={toggleWasCompleted}
    />
    <Divider mb="md" />
    
    {videoURL && <AspectRatio ratio={1920 / 1080} mx="auto" mb="md">
      <iframe
        className={classes.video}
        src={videoURL}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </AspectRatio>}
  </>
}
