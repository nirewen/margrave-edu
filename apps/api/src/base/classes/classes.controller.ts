import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { Payload } from 'src/auth/auth.interface'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser, Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { UsersService } from '../users/users.service'
import { ClassesService } from './classes.service'
import { CreateClassDTO } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@Controller('classes')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class ClassesController {
    constructor(
        private readonly classesService: ClassesService,
        private readonly usersService: UsersService
    ) {}

    @Post()
    create(@Body() body: CreateClassDTO) {
        return this.classesService.create(body)
    }

    @Get()
    @Roles(UserRole.TEACHER)
    findAll() {
        return this.classesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.classesService.findOne(id)
    }

    @Get(':id/students')
    @Roles(UserRole.TEACHER)
    findStudents(@Param('id') id: string) {
        return this.usersService.findAllByClass(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateClassDto) {
        return this.classesService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.classesService.remove(id)
    }
}
