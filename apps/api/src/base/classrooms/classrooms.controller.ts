import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { ClassroomsService } from './classrooms.service'
import { CreateClassroomDTO } from './dto/create-classroom.dto'
import { UpdateClassroomDTO } from './dto/update-classroom.dto'

@Controller('classrooms')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class ClassroomsController {
    constructor(private readonly classroomsService: ClassroomsService) {}

    @Post()
    create(@Body() body: CreateClassroomDTO) {
        return this.classroomsService.create(body)
    }

    @Get()
    findAll() {
        return this.classroomsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.classroomsService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateClassroomDTO) {
        return this.classroomsService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.classroomsService.remove(id)
    }
}
