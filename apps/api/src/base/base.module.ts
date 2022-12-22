import { Global, Module } from '@nestjs/common'
import { AnswersModule } from './answers/answers.module'
import { AssignmentsModule } from './assignments/assignments.module'
import { ClassesModule } from './classes/classes.module'
import { LessonsModule } from './lessons/lessons.module'
import { ProfilesModule } from './profiles/profiles.module'
import { SubjectsModule } from './subjects/subjects.module'
import { UsersModule } from './users/users.module'

@Global()
@Module({
    imports: [
        AnswersModule,
        AssignmentsModule,
        ClassesModule,
        LessonsModule,
        ProfilesModule,
        SubjectsModule,
        UsersModule,
    ],
    exports: [
        AnswersModule,
        AssignmentsModule,
        ClassesModule,
        LessonsModule,
        ProfilesModule,
        SubjectsModule,
        UsersModule,
    ],
})
export class BaseModule {}
