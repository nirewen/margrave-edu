import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Class } from 'src/entities/class.entity'
import { Repository } from 'typeorm'
import { CreateClassDTO } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@Injectable()
export class ClassesService {
    constructor(@InjectRepository(Class) private classes: Repository<Class>) {}

    async create(createClassDto: CreateClassDTO) {
        const obj = this.classes.create(createClassDto)

        return this.classes.save(obj)
    }

    async findAll() {
        return this.classes.find()
    }

    async findOne(id: number) {
        return this.classes.findOneBy({ id })
    }

    async update(id: number, updateClassDto: UpdateClassDto) {
        const obj = await this.findOne(id)

        return this.classes.save({ ...obj, ...updateClassDto })
    }

    async remove(id: number) {
        const obj = await this.findOne(id)

        return this.classes.remove(obj)
    }
}
