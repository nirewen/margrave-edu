import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from 'src/entities/lesson.entity'
import { Repository } from 'typeorm'
import { CreateLessonDTO } from './dto/create-lesson.dto'
import { UpdateLessonDTO } from './dto/update-lesson.dto'

@Injectable()
export class LessonsService {
    constructor(@InjectRepository(Lesson) private readonly lessons: Repository<Lesson>) {}

    async create(body: CreateLessonDTO) {
        const lesson = this.lessons.create(body)

        return this.lessons.save(lesson)
    }

    async findAll() {
        return this.lessons.find()
    }

    async findOne(id: number) {
        const lesson = await this.lessons.findOneBy({ id })

        if (!lesson) {
            throw new NotFoundException('lesson for provided id was not found')
        }

        return lesson
    }

    async update(id: number, body: UpdateLessonDTO) {
        const lesson = await this.findOne(id)

        return this.lessons.save({ ...lesson, ...body })
    }

    async remove(id: number) {
        const lesson = await this.findOne(id)

        return this.lessons.remove(lesson)
    }
}
