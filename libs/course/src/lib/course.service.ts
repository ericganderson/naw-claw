import {Injectable} from '@angular/core'
import {CreateCourseInput} from './dto/createCourse.input'
import {UpdateCourseInput} from './dto/updateCourse.input'
import {Course} from './models/course'

@Injectable()
export class CourseService {
  items: Course[] = [
    {id: 'intro-to-gql', title: 'Introduction to GraphQL'},
    {id: 'gql-for-experts', title: 'GraphQL for Experts'},
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

  public updateCourse(id: string, input: UpdateCourseInput) {
    const course = this.course(id)
    const updated = {
      ...course,
      ...input,
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
}
