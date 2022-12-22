import { Global, Module } from '@nestjs/common'
import { ClassesModule } from './classes/classes.module'
import { LessonsModule } from './lessons/lessons.module'
import { ProfilesModule } from './profiles/profiles.module'
import { SubjectsModule } from './subjects/subjects.module'
import { UsersModule } from './users/users.module'

@Global()
@Module({
    imports: [ProfilesModule, UsersModule, ClassesModule, LessonsModule, SubjectsModule],
    exports: [UsersModule],
})
export class BaseModule {}
