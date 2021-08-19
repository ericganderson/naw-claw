import {Module} from '@nestjs/common'
import {CourseService} from './course.service'
import {CourseResolver} from './resolvers/course.resolver'
import {LessonResolver} from './resolvers/lesson.resolver'

@Module({
  controllers: [],
  providers: [CourseResolver, CourseService, LessonResolver],
  exports: [],
})
export class CourseModule {}
