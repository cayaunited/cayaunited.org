export interface CourseMetadata {
  title: string
  description: string
  lastUpdated: string
}

export interface LessonMetadata {
  title: string
  description: string
  lastUpdated: string
}

export interface LinkMetadata {
  url: string
  label: string
}

export type CourseLinkMetadata = LinkMetadata & { lessonLinks: LinkMetadata[] }
