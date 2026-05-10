export interface CourseMetadata {
  title: string
  fullTitle: string
  link: string
  description: string
  lastUpdated: string
  keywords?: string
}

export interface LessonMetadata {
  title: string
  description: string
  lastUpdated: string
  orderInCourse: number
  keywords?: string
  videoURL?: string
  thumbnailURL?: string
  thumbnailAltText?: string
  previousURL?: string
  nextURL?: string
}

export type ExtendedLessonMetadata = LessonMetadata & { courseID: string, lessonID: string, url: string }

export interface LinkMetadata {
  url: string
  label: string
}

export type CourseLinkMetadata = LinkMetadata & { lessonLinks: LinkMetadata[] }
