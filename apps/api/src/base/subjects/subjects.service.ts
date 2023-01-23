import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Subject } from 'src/entities/subject.entity'
import { UserRole } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { CreateSubjectDTO } from './dto/create-subject.dto'
import { UpdateSubjectDTO } from './dto/update-subject.dto'

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subject) private readonly subjects: Repository<Subject>,
        private readonly usersService: UsersService
    ) {}

    async count() {
        return this.subjects.count()
    }

    async create({ teacherId, ...body }: CreateSubjectDTO) {
        const subject = this.subjects.create(body)
        const teacher = await this.usersService.findOneById(teacherId)

        if (teacher.role !== UserRole.TEACHER) {
            throw new BadRequestException('the provided user is not a TEACHER')
        }

        subject.teacher = teacher

        return this.subjects.save(subject)
    }

    async findAll() {
        return this.subjects.find({
            relations: {
                teacher: {
                    profile: true,
                },
            },
        })
    }

    async findOne(id: string) {
        const subject = await this.subjects.findOne({
            where: { id },
            relations: {
                teacher: true,
                classSubjects: true,
            },
        })

        if (!subject) {
            throw new NotFoundException('subject with provided id was not found')
        }

        return subject
    }

    async update(id: string, { teacherId, ...body }: UpdateSubjectDTO) {
        const subject = await this.findOne(id)

        if (teacherId !== null) {
            const teacher = await this.usersService.findOneById(teacherId)

            subject.teacher = teacher
        }

        return this.subjects.save({ ...subject, ...body })
    }

    async remove(id: string) {
        const subject = await this.findOne(id)

        return this.subjects.remove(subject)
    }
}
