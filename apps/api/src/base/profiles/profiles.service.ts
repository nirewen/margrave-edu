import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Profile } from 'src/entities/profile.entity'
import { Repository } from 'typeorm'
import { UpdateProfileDTO } from './dto/update-profile.dto'

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private readonly profiles: Repository<Profile>) {}

    async findAll() {
        return this.profiles.find()
    }

    async findOne(userId: string) {
        const profile = await this.profiles.findOneBy({ user: { id: userId } })

        if (!profile) {
            throw new NotFoundException('profile for provided user id was not found')
        }

        return profile
    }

    async update(id: string, body: UpdateProfileDTO) {
        const profile = await this.findOne(id)

        return this.profiles.save({ ...profile, ...body })
    }
}
