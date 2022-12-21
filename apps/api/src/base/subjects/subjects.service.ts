import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Subject } from 'src/entities/subject.entity'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { CreateSubjectDTO } from './dto/create-subject.dto'
import { UpdateSubjectDTO } from './dto/update-subject.dto'

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subject) private subjects: Repository<Subject>,
        private readonly usersService: UsersService
    ) {}

    async create(createSubjectDto: CreateSubjectDTO) {
        const subject = this.subjects.create(createSubjectDto)
        const teacher = await this.usersService.findOneById(createSubjectDto.teacherId)

        subject.teacher = teacher

        return this.subjects.save(subject)
    }

    async findAll() {
        return this.subjects.find()
    }

    async findOne(id: number) {
        return this.subjects.findOneBy({ id })
    }

    async update(id: number, updateSubjectDto: UpdateSubjectDTO) {
        const subject = await this.findOne(id)

        if (updateSubjectDto.teacherId !== null) {
            const teacher = await this.usersService.findOneById(updateSubjectDto.teacherId)

            subject.teacher = teacher
        }

        return this.subjects.save({ ...subject, ...updateSubjectDto })
    }

    async remove(id: number) {
        const subject = await this.findOne(id)

        return this.subjects.remove(subject)
    }
}
