import { OrGuard } from '@nest-lab/or-guard'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { CurrentUserGuard } from 'src/common/guards/current-user.guard'
import { UserRole } from 'src/entities/user.entity'
import { CreateProfileDTO } from './dto/create-profile.dto'
import { UpdateProfileDTO } from './dto/update-profile.dto'
import { ProfilesService } from './profiles.service'

@Controller('profiles')
@UseGuards(JwtAuthGuard, OrGuard([CurrentUserGuard, RolesGuard]))
@Roles(UserRole.ADMIN)
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    @Get()
    findAll() {
        return this.profilesService.findAll()
    }

    @Post()
    create(@Body() createProfileDTO: CreateProfileDTO) {
        return this.profilesService.create(createProfileDTO.id)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.profilesService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() newProfile: UpdateProfileDTO) {
        return this.profilesService.update(id, newProfile)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.profilesService.remove(id)
    }
}
