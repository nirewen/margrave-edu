import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { ClassSubjectsService } from './class-subjects.service'
import { CreateClassSubjectDTO } from './dto/create-class-subject.dto'
import { UpdateClassSubjectDTO } from './dto/update-class-subject.dto'

@Controller('class-subjects')
export class ClassSubjectsController {
    constructor(private readonly classSubjectsService: ClassSubjectsService) {}

    @Post(':subjectId/:classId')
    create(
        @Param('subjectId', ParseIntPipe) subjectId: string,
        @Param('classId', ParseIntPipe) classId: string,
        @Body() body: CreateClassSubjectDTO
    ) {
        return this.classSubjectsService.create(subjectId, classId, body)
    }

    @Get(':subjectId/:classId')
    findOne(
        @Param('subjectId', ParseIntPipe) subjectId: string,
        @Param('classId', ParseIntPipe) classId: string
    ) {
        return this.classSubjectsService.findOne(subjectId, classId)
    }

    @Patch(':subjectId/:classId')
    update(
        @Param('subjectId', ParseIntPipe) subjectId: string,
        @Param('classId', ParseIntPipe) classId: string,
        @Body() body: UpdateClassSubjectDTO
    ) {
        return this.classSubjectsService.update(subjectId, classId, body)
    }

    @Delete(':subjectId/:classId')
    delete(
        @Param('subjectId', ParseIntPipe) subjectId: string,
        @Param('classId', ParseIntPipe) classId: string
    ) {
        return this.classSubjectsService.remove(subjectId, classId)
    }
}
