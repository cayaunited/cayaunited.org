import { cache } from 'react'
import { LessonMetadata } from '@/utilities/types'

const getLesson = cache(async (courseID: string, lessonID: string) => {
  try {
    const { default: LessonContent, metadata } = await import(`@/courses/${courseID}/${lessonID}.mdx`)
    return { LessonContent, metadata: metadata as LessonMetadata }
  } catch {
    return null
  }
})

export default getLesson
