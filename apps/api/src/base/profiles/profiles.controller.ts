import { OrGuard } from '@nest-lab/or-guard'
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { CurrentUserGuard, RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { UpdateProfileDTO } from './dto/update-profile.dto'
import { ProfilesService } from './profiles.service'

@Controller('profiles')
@UseGuards(OrGuard([CurrentUserGuard, RolesGuard]))
@Roles(UserRole.ADMIN)
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @Get()
    findAll() {
        return this.profilesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profilesService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateProfileDTO) {
        console.log('🚀 ~ file: profiles.controller.ts:27 ~ ProfilesController ~ update ~ body', body)
        return this.profilesService.update(id, body)
    }
}
