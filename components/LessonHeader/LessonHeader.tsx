'use client'

import { Anchor, AspectRatio, Divider, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { CourseMetadata, LessonMetadata } from '@/utilities/types'

import classes from '@/common.module.css'

export default function LessonHeader({ course, lesson }: { course: CourseMetadata, lesson: LessonMetadata }) {
  const { title, description, lastUpdated, orderInCourse, videoURL } = lesson
  
  return <>
    <Title order={1}>{title}</Title>
    <Text size="xl" mb="md">
      Part {orderInCourse} of <Anchor component={Link} href={course.link}>{course.fullTitle}</Anchor>
    </Text>
    <Text mb="md">Last updated on {lastUpdated}</Text>
    <Text className={classes['text-wrap-pretty']} mb="md">{description}</Text>
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
