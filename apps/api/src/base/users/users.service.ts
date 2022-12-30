import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

import { User, UserRole } from 'src/entities/user.entity'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

    async count() {
        return this.users.count()
    }

    async countByRole(role: UserRole) {
        return this.users.count({
            where: { role },
        })
    }

    private hashPassword(password: string) {
        return bcrypt.hash(password, 10)
    }

    async create(user: CreateUserDTO) {
        const password = await this.hashPassword(user.password)

        const newUser = this.users.create({ ...user, password })

        return this.users.save(newUser)
    }

    async findAll() {
        return this.users.find({
            relations: {
                profile: true,
            },
        })
    }

    async findAllByRole(role: UserRole) {
        return this.users.find({
            where: { role },
            relations: {
                profile: true,
            },
        })
    }

    async findOne(email: string) {
        const user = await this.users.findOne({
            where: { email },
            relations: {
                profile: true,
            },
        })

        if (!user) {
            throw new NotFoundException('user with provided email was not found')
        }

        return user
    }

    async findOneById(id: number) {
        const user = await this.users.findOne({
            where: { id },
            relations: {
                profile: true,
            },
        })

        if (!user) {
            throw new NotFoundException('user with provided id was not found')
        }

        return user
    }

    async update(id: number, body: UpdateUserDTO) {
        const user = await this.findOneById(id)

        body.password = body.password || user.password

        if (body.password && body.password !== user.password) {
            body.password = await this.hashPassword(body.password)
        }

        return this.users.save({ ...user, ...body })
    }

    async remove(id: number) {
        const user = await this.findOneById(id)

        return this.users.remove(user)
    }
}
