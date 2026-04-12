import { Container, Stack, Text, Title } from '@mantine/core'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import LessonCard from '@/components/LessonCard/LessonCard'
import getCourse from '@/utilities/getCourse'
import getLesson from '@/utilities/getLesson'
import { getStaticCourseParams, getStaticLessonParams } from '@/utilities/getStaticParams'
import { LessonMetadata } from '@/utilities/types'

import classes from '@/common.module.css'

interface CourseParams { courseID: string }

export async function generateMetadata({ params }: { params: Promise<CourseParams> }): Promise<Metadata> {
  const { courseID } = await params
  const course = await getCourse(courseID)
  if (!course) return { title: 'Page Not Found | CAYA United' }
  
  return {
    title: `${course.metadata.title} | CAYA United`,
    description: course.metadata.description
  }
}

export async function generateStaticParams() {
  return await getStaticCourseParams()
}

export default async function Page({ params }: { params: Promise<CourseParams> }) {
  const { courseID } = await params
  const course = await getCourse(courseID)
  if (!course) notFound()
  const { CourseContent, metadata } = course
  const { title, description, lastUpdated } = metadata
  
  const lessonParams = await getStaticLessonParams(courseID)
  const lessons: (LessonMetadata & { url: string })[] = []
  
  for (const lesson of lessonParams) {
    const { lessonID } = lesson
    const lessonData = await getLesson(courseID, lesson.lessonID)
    if (lessonData) lessons.push({ url: `/${courseID}/${lessonID}`, ...lessonData.metadata })
  }
  
  return <Container>
    <Title order={1}>{title}</Title>
    <Text mb="md">Last updated on {lastUpdated}</Text>
    <Text mb="md" className={classes['text-wrap-pretty']}>{description}</Text>
    <Title order={2} mb="md">Lessons In This Course</Title>
    
    <Stack>
      {lessons.map((lesson) => <LessonCard key={lesson.url} lesson={lesson} />)}
    </Stack>
    
    <CourseContent />
  </Container>
}
