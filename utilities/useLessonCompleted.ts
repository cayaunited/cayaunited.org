import { useLocalStorage } from '@mantine/hooks'

export default function useLessonCompleted(courseID: string, lessonID: string) {
  const [lessonsCompleted, setLessonsCompleted] = useLocalStorage({
    key: `${courseID}-completion`,
    defaultValue: '',
  })
  
  const wasCompleted = lessonsCompleted.includes(lessonID)
  
  const toggleWasCompleted = () => setLessonsCompleted((previousCompleted) => {
    const completionArray = previousCompleted.split('|')
    const lessonIndex = completionArray.indexOf(lessonID)
    if (lessonIndex >= 0) completionArray.splice(lessonIndex, 1)
    else completionArray.push(lessonID)
    return completionArray.join('|')
  })
  
  return { wasCompleted, toggleWasCompleted }
}
