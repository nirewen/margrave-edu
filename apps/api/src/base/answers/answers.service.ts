import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Answer } from 'src/entities/answer.entity'
import { Repository } from 'typeorm'
import { AssignmentsService } from '../assignments/assignments.service'
import { UsersService } from '../users/users.service'
import { CreateAnswerDTO } from './dto/create-answer.dto'
import { UpdateAnswerDTO } from './dto/update-answer.dto'

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private readonly answers: Repository<Answer>,
        private readonly usersService: UsersService,
        private readonly assignmentsService: AssignmentsService
    ) {}

    async create(userId: number, { assignmentId, ...body }: CreateAnswerDTO) {
        const answer = this.answers.create(body)

        const user = await this.usersService.findOneById(userId)
        const assignment = await this.assignmentsService.findOne(assignmentId)

        answer.user = user
        answer.assignment = assignment

        return this.answers.save(answer)
    }

    async findAll() {
        return this.answers.find()
    }

    async findOne(id: number) {
        return this.answers.findOneBy({ id })
    }

    async findMine(userId: number, id: number) {
        return this.answers.findBy({ id, user: { id: userId } })
    }

    async update(id: number, body: UpdateAnswerDTO) {
        const answer = await this.findOne(id)

        return this.answers.save({ ...answer, ...body })
    }

    async remove(id: number) {
        const answer = await this.findOne(id)

        return this.answers.remove(answer)
    }
}
