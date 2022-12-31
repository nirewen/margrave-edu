import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Class } from 'src/entities/class.entity'
import { Repository } from 'typeorm'
import { CreateClassDTO } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@Injectable()
export class ClassesService {
    constructor(@InjectRepository(Class) private readonly classes: Repository<Class>) {}

    async count() {
        return this.classes.count()
    }

    async create(body: CreateClassDTO) {
        const entity = await this.findOneByNumber(body.number).catch(() => null)

        if (entity) {
            throw new BadRequestException('a class with this number is already registered')
        }

        const obj = this.classes.create(body)

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
        const entity = await this.classes.findOneBy({ id })

        if (!entity) {
            throw new NotFoundException('class for provided id was not found')
        }

        return entity
    }

    async update(id: string, body: UpdateClassDto) {
        const obj = await this.findOne(id)

        return this.classes.save({ ...obj, ...body })
    }

    async remove(id: string) {
        const obj = await this.findOne(id)

        return this.classes.remove(obj)
    }
}
