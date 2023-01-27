import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { Payload } from 'src/auth/auth.interface'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser, Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { CreateLessonDTO } from './dto/create-lesson.dto'
import { UpdateLessonDTO } from './dto/update-lesson.dto'
import { LessonsService } from './lessons.service'

@Controller('lessons')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class LessonsController {
    constructor(private readonly lessonsService: LessonsService) {}

    @Post()
    @Roles(UserRole.TEACHER)
    create(@Body() body: CreateLessonDTO) {
        return this.lessonsService.create(body)
    }

    @Get()
    findAll() {
        return this.lessonsService.findAll()
    }

    @Get('@me')
    @Roles(UserRole.TEACHER)
    findAllMe(@ReqUser() payload: Payload) {
        return this.lessonsService.findAllMe(payload.id)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.lessonsService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateLessonDTO) {
        return this.lessonsService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.lessonsService.remove(id)
    }
}
