import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ClassSubjectsService } from './class-subjects.service'
import { CreateClassSubjectDTO } from './dto/create-class-subject.dto'
import { UpdateClassSubjectDTO } from './dto/update-class-subject.dto'

@Controller('class-subjects')
export class ClassSubjectsController {
    constructor(private readonly classSubjectsService: ClassSubjectsService) {}

    @Post(':subjectId/:classId')
    create(
        @Param('subjectId') subjectId: string,
        @Param('classId') classId: string,
        @Body() body: CreateClassSubjectDTO
    ) {
        return this.classSubjectsService.create(subjectId, classId, body)
    }

    @Get(':subjectId/:classId')
    findOne(@Param('subjectId') subjectId: string, @Param('classId') classId: string) {
        return this.classSubjectsService.findOne(subjectId, classId)
    }

    @Patch(':subjectId/:classId')
    update(
        @Param('subjectId') subjectId: string,
        @Param('classId') classId: string,
        @Body() body: UpdateClassSubjectDTO
    ) {
        return this.classSubjectsService.update(subjectId, classId, body)
    }

    @Delete(':subjectId/:classId')
    delete(@Param('subjectId') subjectId: string, @Param('classId') classId: string) {
        return this.classSubjectsService.remove(subjectId, classId)
    }
}
