import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesGuard } from 'src/auth/guards'
import { CurrentUserGuard } from 'src/auth/guards'
import { Profile } from 'src/entities/profile.entity'
import { ProfilesController } from './profiles.controller'
import { ProfilesService } from './profiles.service'

@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    controllers: [ProfilesController],
    providers: [ProfilesService, CurrentUserGuard, RolesGuard],
    exports: [ProfilesService],
})
export class ProfilesModule {}
