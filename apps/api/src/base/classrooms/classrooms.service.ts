import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Classroom } from 'src/entities/classroom.entity'
import { Repository } from 'typeorm'
import { CreateClassroomDTO } from './dto/create-classroom.dto'
import { UpdateClassroomDTO } from './dto/update-classroom.dto'

@Injectable()
export class ClassroomsService {
    constructor(@InjectRepository(Classroom) private readonly classrooms: Repository<Classroom>) {}

    create(body: CreateClassroomDTO) {
        const classroom = this.classrooms.create(body)

        return this.classrooms.save(classroom)
    }

    findAll() {
        return this.classrooms.find()
    }

    findOne(id: string) {
        return this.classrooms.findOneBy({ id })
    }

    async update(id: string, body: UpdateClassroomDTO) {
        const classroom = await this.findOne(id)

        return this.classrooms.save({ ...classroom, ...body })
    }

    async remove(id: string) {
        const classroom = await this.findOne(id)

        return this.classrooms.remove(classroom)
    }
}
