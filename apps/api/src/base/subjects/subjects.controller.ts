import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { SubjectsService } from './subjects.service'
import { CreateSubjectDTO } from './dto/create-subject.dto'
import { UpdateSubjectDTO } from './dto/update-subject.dto'

@Controller('subjects')
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
