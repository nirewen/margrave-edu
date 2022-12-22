import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
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
    create(@Body() createLessonDto: CreateLessonDTO) {
        return this.lessonsService.create(createLessonDto)
    }

    @Get()
    findAll() {
        return this.lessonsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.lessonsService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDTO) {
        return this.lessonsService.update(+id, updateLessonDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.lessonsService.remove(+id)
    }
}
