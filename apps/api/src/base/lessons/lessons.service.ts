import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from 'src/entities/lesson.entity'
import { Repository } from 'typeorm'
import { ClassesService } from '../classes/classes.service'
import { SubjectsService } from '../subjects/subjects.service'
import { CreateLessonDTO } from './dto/create-lesson.dto'
import { UpdateLessonDTO } from './dto/update-lesson.dto'

@Injectable()
export class LessonsService {
    constructor(
        @InjectRepository(Lesson)
        private readonly lessons: Repository<Lesson>,
        private readonly classesService: ClassesService,
        private readonly subjectsService: SubjectsService
    ) {}

    async count() {
        return this.lessons.count()
    }

    async create({ classId, subjectId, ...body }: CreateLessonDTO) {
        const lessonClass = await this.classesService.findOne(classId)
        const subject = await this.subjectsService.findOne(subjectId)

        const lesson = this.lessons.create(body)

        lesson.class = lessonClass
        lesson.subject = subject

        return this.lessons.save(lesson)
    }

    async findAll() {
        return this.lessons.find()
    }

    async findOne(id: string) {
        const lesson = await this.lessons.findOneBy({ id })

        if (!lesson) {
            throw new NotFoundException('lesson for provided id was not found')
        }

        return lesson
    }

    async update(id: string, body: UpdateLessonDTO) {
        const lesson = await this.findOne(id)

        return this.lessons.save({ ...lesson, ...body })
    }

    async remove(id: string) {
        const lesson = await this.findOne(id)

        return this.lessons.remove(lesson)
    }
}
