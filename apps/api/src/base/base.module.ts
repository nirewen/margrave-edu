import { Global, Module } from '@nestjs/common'
import { ProfilesModule } from './profiles/profiles.module'
import { UsersModule } from './users/users.module'
import { ClassesModule } from './classes/classes.module'

@Global()
@Module({
    imports: [ProfilesModule, UsersModule, ClassesModule],
    exports: [UsersModule],
})
export class BaseModule {}
