import { OrGuard } from '@nest-lab/or-guard'
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { Payload } from 'src/auth/auth.interface'
import { CurrentUserGuard, RolesGuard } from 'src/auth/guards'
import { ReqUser, Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { UpdateProfileDTO } from './dto/update-profile.dto'
import { ProfilesService } from './profiles.service'

@Controller('profiles')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @Get()
    findAll() {
        return this.profilesService.findAll()
    }

    @Get('@me')
    me(@ReqUser() payload: Payload) {
        return this.findOne(payload.id)
    }

    @Patch('@me')
    edit(@ReqUser() payload: Payload, @Body() body: UpdateProfileDTO) {
        return this.update(payload.id, body)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profilesService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateProfileDTO) {
        return this.profilesService.update(id, body)
    }
}
