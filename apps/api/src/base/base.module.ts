import { Global, Module } from '@nestjs/common'
import { AnswersModule } from './answers/answers.module'
import { AssignmentsModule } from './assignments/assignments.module'
import { AttendancesModule } from './attendances/attendances.module'
import { AvatarModule } from './avatar/avatar.module'
import { ClassSubjectsModule } from './class-subjects/class-subjects.module'
import { ClassesModule } from './classes/classes.module'
import { LessonsModule } from './lessons/lessons.module'
import { ProfilesModule } from './profiles/profiles.module'
import { SubjectsModule } from './subjects/subjects.module'
import { UsersModule } from './users/users.module'
import { StatsModule } from './stats/stats.module'
import { ClassroomsModule } from './classrooms/classrooms.module'

@Global()
@Module({
    imports: [
        AnswersModule,
        AssignmentsModule,
        AttendancesModule,
        AvatarModule,
        ClassesModule,
        ClassroomsModule,
        ClassSubjectsModule,
        LessonsModule,
        ProfilesModule,
        StatsModule,
        SubjectsModule,
        UsersModule,
    ],
    exports: [
        AnswersModule,
        AssignmentsModule,
        AttendancesModule,
        AvatarModule,
        ClassesModule,
        ClassroomsModule,
        ClassSubjectsModule,
        LessonsModule,
        ProfilesModule,
        SubjectsModule,
        UsersModule,
    ],
})
export class BaseModule {}
