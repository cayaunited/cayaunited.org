import { cache } from 'react'
import { CourseMetadata } from '@/utilities/types'

const getCourse = cache(async (courseID: string) => {
  try {
    const { default: CourseContent, metadata } = await import(`@/courses/${courseID}/index.mdx`)
    return { CourseContent, metadata: metadata as CourseMetadata }
  } catch {
    return null
  }
})

export default getCourse
