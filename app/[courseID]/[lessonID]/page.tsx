import { AspectRatio, Container, Divider, Group, Text, Title } from '@mantine/core'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import getCourse from '@/utilities/getCourse'
import getLesson from '@/utilities/getLesson'
import { getStaticCourseParams, getStaticLessonParams } from '@/utilities/getStaticParams'

import classes from '@/common.module.css'

interface LessonParams { courseID: string, lessonID: string }

export async function generateMetadata({ params }:
  { params: Promise<LessonParams> }): Promise<Metadata> {
  const { courseID, lessonID } = await params
  const course = await getCourse(courseID)
  if (!course) return { title: 'Page Not Found | CAYA United' }
  const lesson = await getLesson(courseID, lessonID)
  if (!lesson) return { title: 'Page Not Found | CAYA United' }
  
  return {
    title: `${lesson.metadata.title} | ${course.metadata.title} | CAYA United`,
    description: lesson.metadata.description
  }
}

export async function generateStaticParams() {
  const courseParams = await getStaticCourseParams()
  const lessonParams: LessonParams[] = []
  
  for (const course of courseParams) {
    const { courseID } = course
    const lessons = await getStaticLessonParams(courseID)
    
    for (const lesson of lessons) {
      lessonParams.push({ courseID, lessonID: lesson.lessonID })
    }
  }
  
  return lessonParams
}

export default async function Page({ params }: { params: Promise<LessonParams> }) {
  const { courseID, lessonID } = await params
  const lesson = await getLesson(courseID, lessonID)
  if (!lesson) notFound()
  const { LessonContent, metadata } = lesson
  const { title, description, lastUpdated } = metadata
  
  return <Container mb="-1rem">
    <Title order={1}>{title}</Title>
    <Text mb="md">Last updated on {lastUpdated}</Text>
    <Text className={classes['text-wrap-pretty']} mb="md">{description}</Text>
    <Divider mb="md" />
    
    {/* <Group justify="center" mb="md">
      
    </Group> */}
    <AspectRatio ratio={1920 / 1080} mx="auto" mb="md">
      <iframe
        className={classes.video}
        src="https://www.youtube-nocookie.com/embed/K1-FoFj8Jbo?si=wXnbjkhYB49cMdY5"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </AspectRatio>
    
    <LessonContent />
  </Container>
}
