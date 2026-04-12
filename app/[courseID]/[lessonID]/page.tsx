import { Container, Text, Title } from '@mantine/core'
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
  
  return <Container>
    <Title order={1}>{title}</Title>
    <Text mb="md">Last updated on {lastUpdated}</Text>
    <Text className={classes['text-wrap-pretty']}>{description}</Text>
    <LessonContent />
  </Container>
}
