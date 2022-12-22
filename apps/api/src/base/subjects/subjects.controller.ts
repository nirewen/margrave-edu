import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { SubjectsService } from './subjects.service'
import { CreateSubjectDTO } from './dto/create-subject.dto'
import { UpdateSubjectDTO } from './dto/update-subject.dto'
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'

@Controller('subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) {}

    @Post()
    async create(@Body() createSubjectDto: CreateSubjectDTO) {
        return this.subjectsService.create(createSubjectDto)
    }

    @Get()
    findAll() {
        return this.subjectsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subjectsService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDTO) {
        return this.subjectsService.update(+id, updateSubjectDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subjectsService.remove(+id)
    }
}
