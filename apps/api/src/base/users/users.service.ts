import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

import { User } from 'src/entities/user.entity'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private users: Repository<User>) {}

    private hashPassword(password: string) {
        return bcrypt.hash(password, 10)
    }

    async create(user: CreateUserDTO) {
        const password = await this.hashPassword(user.password)

        const newUser = this.users.create({ ...user, password })

        return this.users.save(newUser)
    }

    async findAll() {
        return this.users.find()
    }

    async findOne(email: string) {
        const user = await this.users.findOneBy({ email })

        if (!user) {
            throw new NotFoundException('user with provided email was not found')
        }

        return user
    }

    async findOneById(id: number) {
        const user = await this.users.findOneBy({ id })

        if (!user) {
            throw new NotFoundException('user with provided id was not found')
        }

        return user
    }

    async update(id: number, newUser: UpdateUserDTO) {
        const user = await this.findOneById(id)

        newUser.password = newUser.password || user.password

        if (newUser.password && newUser.password !== user.password) {
            newUser.password = await this.hashPassword(newUser.password)
        }

        return this.users.save({ ...user, ...newUser })
    }

    async remove(id: number) {
        const user = await this.findOneById(id)

        return this.users.remove(user)
    }
}
