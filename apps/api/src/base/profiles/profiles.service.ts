import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Profile } from 'src/entities/profile.entity'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { UpdateProfileDTO } from './dto/update-profile.dto'

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile) private readonly profiles: Repository<Profile>,
        private readonly usersService: UsersService
    ) {}

    async findAll() {
        return this.profiles.find()
    }

    async findOne(userId: string) {
        const profile = await this.profiles.findOne({
            where: { user: { id: userId } },
            relations: ['user'],
        })

        if (!profile) {
            throw new NotFoundException('profile for provided user id was not found')
        }

        return profile
    }

    async update(id: string, body: UpdateProfileDTO) {
        const profile = await this.findOne(id)

        if (body.user) {
            await this.usersService.update(id, body.user)
        }

        return this.profiles.save({ ...profile, ...body })
    }
}
