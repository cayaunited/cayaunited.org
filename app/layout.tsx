import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core'
import { Metadata } from 'next'
import { ReactNode } from 'react'

import AppLayout from '@/components/AppLayout/AppLayout'
import { resolver, theme } from '@/theme'
import getCourse from '@/utilities/getCourse'
import getLesson from '@/utilities/getLesson'
import { getStaticCourseParams, getStaticLessonParams } from '@/utilities/getStaticParams'
import { CourseLinkMetadata, LinkMetadata } from '@/utilities/types'

import '@mantine/core/styles.css'
import '@mantine/code-highlight/styles.css'

export const metadata: Metadata = {
  title: 'CAYA United',
  description: 'Come as you are, develop better, game better, and become better, united as one.',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const courses = await getStaticCourseParams()
  const courseLinks: CourseLinkMetadata[] = []
  
  for (const course of courses) {
    const { courseID } = course
    const lessons = await getStaticLessonParams(courseID)
    const lessonLinks: LinkMetadata[] = lessons.length > 0 ? [{ url: `/${courseID}`, label: 'Home' }] : []
    
    for (const lesson of lessons) {
      const { lessonID } = lesson
      const lessonData = await getLesson(courseID, lessonID)
      if (!lessonData) continue
      lessonLinks.push({ url: `/${courseID}/${lessonID}`, label: lessonData.metadata.title })
    }
    
    const courseData = await getCourse(courseID)
    if (courseData) courseLinks.push({ url: `/${courseID}`, label: courseData.metadata.title, lessonLinks })
  }
  
  return <html lang="en" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript />
      <link rel="shortcut icon" href="/favicon.svg" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </head>
    <body>
      <MantineProvider
        defaultColorScheme="dark"
        theme={theme}
        cssVariablesResolver={resolver}
      >
        <AppLayout courseLinks={courseLinks}>{children}</AppLayout>
      </MantineProvider>
    </body>
  </html>
}
