export const dynamic = 'force-static'

import type { MetadataRoute } from 'next'

import { getStaticCourseParams, getStaticLessonParams } from '@/utilities/getStaticParams'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links: { url: string, priority: number }[] = [{ url: 'https://cayaunited.org', priority: 1 }]
  const courses = await getStaticCourseParams()
  
  for (const course of courses) {
    const { courseID } = course
    const lessons = await getStaticLessonParams(courseID)
    links.push({ url: `https://cayaunited.org/${courseID}`, priority: 0.5 })
    
    for (const lesson of lessons) {
      const { lessonID } = lesson
      links.push({ url: `https://cayaunited.org/${courseID}/${lessonID}`, priority: 0.7 })
    }
  }
  
  return links
}
