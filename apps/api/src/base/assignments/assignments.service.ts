import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Assignment } from 'src/entities/assignment.entity'
import { Repository } from 'typeorm'
import { LessonsService } from '../lessons/lessons.service'
import { CreateAssignmentDTO } from './dto/create-assignment.dto'
import { UpdateAssignmentDTO } from './dto/update-assignment.dto'

@Injectable()
export class AssignmentsService {
    constructor(
        @InjectRepository(Assignment) private readonly assignments: Repository<Assignment>,
        private readonly lessonsService: LessonsService
    ) {}

    async create({ lessonId, ...body }: CreateAssignmentDTO) {
        const lesson = await this.lessonsService.findOne(lessonId)
        const assignment = this.assignments.create(body)

        assignment.lesson = lesson

        return this.assignments.save(assignment)
    }

    async findAll() {
        return this.assignments.find()
    }

    async findOne(id: number) {
        return this.assignments.findOneBy({ id })
    }

    async update(id: number, body: UpdateAssignmentDTO) {
        const assignment = await this.findOne(id)

        return this.assignments.save({ ...assignment, ...body })
    }

    async remove(id: number) {
        const assignment = await this.findOne(id)

        return this.assignments.remove(assignment)
    }
}
