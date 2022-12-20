import { Global, Module } from '@nestjs/common'
import { ProfilesModule } from './profiles/profiles.module'
import { UsersModule } from './users/users.module'

@Global()
@Module({
    imports: [ProfilesModule, UsersModule],
    exports: [UsersModule],
})
export class BaseModule {}
