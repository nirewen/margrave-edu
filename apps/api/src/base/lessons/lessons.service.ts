import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Class } from 'src/entities/class.entity'
import { Lesson } from 'src/entities/lesson.entity'
import { Subject } from 'src/entities/subject.entity'
import { CreateLessonDTO } from './dto/create-lesson.dto'
import { UpdateLessonDTO } from './dto/update-lesson.dto'
import { User } from 'src/entities/user.entity'

@Injectable()
export class LessonsService {
    constructor(
        @InjectRepository(Lesson)
        private readonly lessons: Repository<Lesson>
    ) {}

    async count() {
        return this.lessons.count()
    }

    async create({ classId, subjectId, ...body }: CreateLessonDTO) {
        const lesson = this.lessons.create(body)

        lesson.class = new Class()
        lesson.class.id = classId

        lesson.subject = new Subject()
        lesson.subject.id = subjectId

        return this.lessons.save(lesson)
    }

    async findAll() {
        return this.lessons.find({
            relations: {
                assignments: true,
                class: true,
            },
        })
    }

    async findAllMe(id: string) {
        return this.lessons.find({
            where: {
                subject: {
                    teacher: { id },
                },
            },
            relations: {
                assignments: true,
            },
        })
    }

    async findOne(id: string) {
        const lesson = await this.lessons.findOne({
            where: { id },
            relations: {
                class: true,
                subject: {
                    teacher: {
                        profile: true,
                    },
                },
                attendances: true,
                assignments: {
                    answers: {
                        user: true,
                    },
                },
            },
        })

        if (!lesson) {
            throw new NotFoundException('lesson for provided id was not found')
        }

        return lesson
    }

    async update(id: string, { classId, subjectId, ...body }: UpdateLessonDTO) {
        const lesson = await this.findOne(id)

        return this.lessons.save({ ...lesson, ...body })
    }

    async remove(id: string) {
        const lesson = await this.findOne(id)

        return this.lessons.remove(lesson)
    }
}
