import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { FilterQuery, FindOptionsWhere, Repository } from 'typeorm'

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

    // TODO: use afterInsert to hash the password afterwards
    private hashPassword(password: string) {
        return bcrypt.hash(password, 10)
    }

    async create(user: CreateUserDTO) {
        const password = await this.hashPassword(user.password)

        const newUser = this.users.create({ ...user, password })

        return this.users.save(newUser)
    }

    async findAll(filter: FindOptionsWhere<User>) {
        return this.users.find({
            where: filter,
            relations: {
                profile: true,
            },
        })
    }

    async findAllByClass(id: string) {
        return this.users.find({
            where: {
                classes: {
                    id,
                },
            },
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

    async findOneById(id: string) {
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

    async update(id: string, body: UpdateUserDTO) {
        const user = await this.findOneById(id)

        if (body.password && body.password !== user.password) {
            body.password = await this.hashPassword(body.password)
        } else {
            body.password = user.password
        }

        return this.users.save({ ...user, ...body })
    }

    async remove(id: string) {
        const user = await this.findOneById(id)

        return this.users.remove(user)
    }
}
