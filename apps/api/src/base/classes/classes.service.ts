import * as crypto from 'node:crypto'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ClassSubject } from 'src/entities/class-subject.entity'
import { Class } from 'src/entities/class.entity'
import { Subject } from 'src/entities/subject.entity'
import { Repository } from 'typeorm'
import { ClassroomsService } from '../classrooms/classrooms.service'
import { CreateClassDTO } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(Class) private readonly classes: Repository<Class>,
        private readonly classroomsService: ClassroomsService
    ) {}

    async count() {
        return this.classes.count()
    }

    async create({ classroomId, classSubjects, ...body }: CreateClassDTO) {
        const entity = await this.findOneByNumber(body.number).catch(() => null)

        if (entity) {
            throw new BadRequestException('a class with this number is already registered')
        }

        const obj = this.classes.create(body)
        const classroom = await this.classroomsService.findOne(classroomId)

        obj.classroom = classroom

        return this.classes.save(obj)
    }

    async findAll() {
        return this.classes.find()
    }

    async findOneByNumber(number: string) {
        const entity = await this.classes.findOneBy({ number })

        if (!entity) {
            throw new NotFoundException('class for provided number was not found')
        }

        return entity
    }

    async findOne(id: string) {
        const entity = await this.classes.findOne({
            where: { id },
            relations: {
                classroom: true,
                classSubjects: {
                    class: true,
                    subject: true,
                },
            },
        })

        if (!entity) {
            throw new NotFoundException('class for provided id was not found')
        }

        return entity
    }

    async update(id: string, { classroomId, classSubjects, ...body }: UpdateClassDto) {
        const obj = await this.findOne(id)

        if (classroomId !== null && classroomId !== obj.classroom?.id) {
            const classroom = await this.classroomsService.findOne(classroomId)

            obj.classroom = classroom
        }

        obj.classSubjects = classSubjects
            ? classSubjects.map(cs => {
                  const subject = new Subject()
                  const entity = new Class()

                  subject.id = cs.subjectId
                  entity.id = obj.id

                  const classSubject = new ClassSubject()

                  classSubject.id = [subject.id, entity.id].join('_')
                  classSubject.subject = subject
                  classSubject.class = entity
                  classSubject.weekdays = Array.from({ length: 7 }, (_, i) => !!cs.weekdays[i])

                  return classSubject
              })
            : []

        return this.classes.save({ ...obj, ...body })
    }

    async remove(id: string) {
        const obj = await this.findOne(id)

        return this.classes.remove(obj)
    }
}
