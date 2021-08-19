import {Injectable} from '@angular/core'
import {CreateCourseInput} from './dto/createCourse.input'
import {CreateLessonInput} from './dto/createLesson.input'
import {UpdateCourseInput} from './dto/updateCourse.input'
import {UpdateLessonInput} from './dto/updateLesson.input'
import {Course} from './models/course'
import {Lesson} from './models/lesson'

@Injectable()
export class CourseService {
  items: Course[] = [
    {
      id: 'intro-to-gql',
      title: 'Introduction to GraphQL',
      lessons: [
        {id: 'lesson-1', title: 'intro to course', content: 'hey you'},
        {
          id: 'lesson-2',
          title: 'intro to subject',
          content: 'hey, get to work!',
        },
      ],
    },
    {
      id: 'gql-for-experts',
      title: 'GraphQL for Experts',
      lessons: [
        {
          id: 'lesson-2:1',
          title: 'intro to intros',
          content: 'hey, get to work!',
        },
        {
          id: 'lesson-2:2',
          title: 'intro to subslub',
          content: 'hey, get a move on!',
        },
        {id: 'lesson-2:3', title: 'intro to john', content: 'hlebpth! Ick!'},
      ],
    },
  ]

  public courses() {
    return this.items
  }

  public course(id: string) {
    return this.items.find(item => item.id === id)
  }

  public createCourse(input: CreateCourseInput) {
    const newCourse = {
      id: Date.now().toString(),
      ...input,
    }
    this.items.push(newCourse)
    return newCourse
  }

  public updateCourse(
    id: string,
    input: UpdateCourseInput,
    lessons?: Lesson[]
  ) {
    const course = this.course(id)
    const updated = {
      ...course,
      ...input,
      lessons: lessons ? lessons : course.lessons,
    }

    this.items = this.items.map(item => {
      if (item.id === id) {
        return updated
      }
      return item
    })

    return updated
  }

  public deleteCourse(id: string) {
    const course = this.course(id)
    if (!course) {
      return false
    }
    this.items = this.items.filter((item: Course) => item.id !== id)
    return true
  }

  public createLesson(courseId: string, input: CreateLessonInput) {
    const newLesson = {
      id: Date.now().toString(),
      ...input,
    }

    const course = this.course(courseId)
    this.updateCourse(courseId, {}, [...course.lessons, newLesson])

    return newLesson
  }

  public updateLesson(
    courseId: string,
    lessonId: string,
    input: UpdateLessonInput
  ) {
    const course = this.course(courseId)
    const lesson = course.lessons.find(item => item.id === lessonId)

    const updated: Lesson = {...lesson, ...input}
    course.lessons = course.lessons.map(item => {
      if (item.id === lessonId) {
        return updated
      }
      return item
    })
    return updated
  }

  public deleteLesson(courseId: string, lessonId: string) {
    const course = this.course(courseId)
    if (!course) {
      return false
    }
    const lesson = course.lessons.find((item: Lesson) => item.id === lessonId)
    if (!lesson) {
      return false
    }
    course.lessons = course.lessons.filter(
      (item: Lesson) => item.id !== lessonId
    )

    return true
  }
}
