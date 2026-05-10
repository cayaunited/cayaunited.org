import { Container } from '@mantine/core'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import getCourse from '@/utilities/getCourse'
import getLesson from '@/utilities/getLesson'
import { getStaticCourseParams, getStaticLessonParams } from '@/utilities/getStaticParams'

import LessonHeader from '@/components/LessonHeader/LessonHeader'
import LessonFooter from '@/components/LessonFooter/LessonFooter'

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
  const course = await getCourse(courseID)
  if (!course) notFound()
  const lesson = await getLesson(courseID, lessonID)
  if (!lesson) notFound()
  const { LessonContent, metadata } = lesson
  const { nextURL, previousURL } = metadata
  
  const previousLesson = previousURL ? await getLesson(courseID, previousURL) : null
  const nextLesson = nextURL ? await getLesson(courseID, nextURL) : null
  const extendedLessonData = { courseID, lessonID, url: '', ...lesson.metadata }
  
  return <Container>
    <LessonHeader course={course.metadata} lesson={extendedLessonData} />
    <LessonContent />
    <LessonFooter
      course={course.metadata}
      lesson={extendedLessonData}
      previousLesson={previousLesson?.metadata.title}
      nextLesson={nextLesson?.metadata.title}
    />
  </Container>
}
