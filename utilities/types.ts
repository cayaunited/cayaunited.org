export interface CourseMetadata {
  title: string
  fullTitle: string
  link: string
  description: string
  lastUpdated: string
}

export interface LessonMetadata {
  title: string
  description: string
  lastUpdated: string
  orderInCourse: number
  videoURL?: string
  previousURL?: string
  nextURL?: string
}

export interface LinkMetadata {
  url: string
  label: string
}

export type CourseLinkMetadata = LinkMetadata & { lessonLinks: LinkMetadata[] }
