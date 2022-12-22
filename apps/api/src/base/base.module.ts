import { Global, Module } from '@nestjs/common'
import { ProfilesModule } from './profiles/profiles.module'
import { UsersModule } from './users/users.module'
import { ClassesModule } from './classes/classes.module'
import { LessonsModule } from './lessons/lessons.module'
import { SubjectsModule } from './subjects/subjects.module'

@Global()
@Module({
    imports: [ProfilesModule, UsersModule, ClassesModule, LessonsModule, SubjectsModule],
    exports: [UsersModule],
})
export class BaseModule {}
