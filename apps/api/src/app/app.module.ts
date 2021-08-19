import {CoreModule} from '@naw-claw/core'
import {CourseModule} from '@naw-claw/course'
import {Module} from '@nestjs/common'

import {AppController} from './app.controller'
import {AppService} from './app.service'

@Module({
  imports: [CoreModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
