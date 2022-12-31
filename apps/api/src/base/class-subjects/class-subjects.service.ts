import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ClassSubject } from 'src/entities/class-subject.entity'
import { Repository } from 'typeorm'
import { ClassesService } from '../classes/classes.service'
import { SubjectsService } from '../subjects/subjects.service'
import { CreateClassSubjectDTO } from './dto/create-class-subject.dto'
import { UpdateClassSubjectDTO } from './dto/update-class-subject.dto'

@Injectable()
export class ClassSubjectsService {
    constructor(
        @InjectRepository(ClassSubject) private readonly classSubjects: Repository<ClassSubject>,
        private readonly subjectsService: SubjectsService,
        private readonly classesService: ClassesService
    ) {}

    async create(subjectId: string, classId: string, body: CreateClassSubjectDTO) {
        const classSubject = this.classSubjects.create(body)
        const subject = await this.subjectsService.findOne(subjectId)
        const assocClass = await this.classesService.findOne(classId)

        classSubject.subject = subject
        classSubject.class = assocClass

        return this.classSubjects.save(classSubject)
    }

    async findOne(subjectId: string, classId: string) {
        const classSubject = await this.classSubjects.findOne({
            where: {
                subject: { id: subjectId },
                class: { id: classId },
            },
        })

        if (!classSubject) {
            throw new BadRequestException('a link between the provided class and subject was not found')
        }

        return classSubject
    }

    async update(subjectId: string, classId: string, body: UpdateClassSubjectDTO) {
        const classSubject = await this.findOne(subjectId, classId)

        return this.classSubjects.save({ ...classSubject, ...body })
    }

    async remove(subjectId: string, classId: string) {
        const classSubject = await this.findOne(subjectId, classId)

        return this.classSubjects.remove(classSubject)
    }
}
