import { readdir } from 'fs/promises'
import { join, basename, extname } from 'path'
import { cache } from 'react'

const getStaticCourseParams = cache(async () => {
  try {
    const courseDirectory = join(process.cwd(), 'courses')
    const files = await readdir(courseDirectory)
    return files.map((file) => ({ courseID: basename(file, extname(file)) }))
  } catch {
    return []
  }
})

const getStaticLessonParams = cache(async (courseID: string) => {
  try {
    const courseDirectory = join(process.cwd(), `courses/${courseID}`)
    const files = await readdir(courseDirectory)
    return files.map((file) => ({ lessonID: basename(file, extname(file)) }))
      .filter((params) => params.lessonID !== 'index')
  } catch {
    return []
  }
})

export { getStaticCourseParams, getStaticLessonParams }
