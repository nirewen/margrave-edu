import { OrGuard } from '@nest-lab/or-guard'
import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common'
import { CurrentUserGuard, RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { UpdateProfileDTO } from './dto/update-profile.dto'
import { ProfilesService } from './profiles.service'

@Controller('profiles')
@UseGuards(OrGuard([CurrentUserGuard, RolesGuard]))
@Roles(UserRole.ADMIN)
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    @Get()
    findAll() {
        return this.profilesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.profilesService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() newProfile: UpdateProfileDTO) {
        return this.profilesService.update(id, newProfile)
    }
}
