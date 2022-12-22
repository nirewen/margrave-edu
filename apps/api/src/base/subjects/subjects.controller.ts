import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { CreateSubjectDTO } from './dto/create-subject.dto'
import { UpdateSubjectDTO } from './dto/update-subject.dto'
import { SubjectsService } from './subjects.service'

@Controller('subjects')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) {}

    @Post()
    async create(@Body() body: CreateSubjectDTO) {
        return this.subjectsService.create(body)
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
    update(@Param('id') id: string, @Body() body: UpdateSubjectDTO) {
        return this.subjectsService.update(+id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subjectsService.remove(+id)
    }
}
