import {Args, Mutation, Resolver} from '@nestjs/graphql'
import {CourseService} from '../course.service'
import {CreateLessonInput} from '../dto/createLesson.input'
import {UpdateLessonInput} from '../dto/updateLesson.input'
import {Lesson} from '../models/lesson'

@Resolver()
export class LessonResolver {
  constructor(private readonly service: CourseService) {}

  @Mutation(() => Lesson, {nullable: true})
  createLesson(
    @Args('courseId') courseId: string,
    @Args('input') input: CreateLessonInput
  ) {
    return this.service.createLesson(courseId, input)
  }

  @Mutation(() => Lesson, {nullable: true})
  updateLesson(
    @Args('courseId') courseId: string,
    @Args('lessonId') lessonId: string,
    @Args('input') input: UpdateLessonInput
  ) {
    return this.service.updateLesson(courseId, lessonId, input)
  }

  @Mutation(() => Boolean, {nullable: true})
  deleteLesson(
    @Args('courseId') courseId: string,
    @Args('lessonId') lessonId: string
  ) {
    return this.service.deleteLesson(courseId, lessonId)
  }
}
