import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Profile } from 'src/entities/profile.entity'
import { Repository } from 'typeorm'
import { UpdateProfileDTO } from './dto/update-profile.dto'

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private profiles: Repository<Profile>) {}

    async findAll() {
        return this.profiles.find()
    }

    async findOne(userId: number) {
        const profile = await this.profiles.findOneBy({ id: userId })

        if (!profile) {
            throw new NotFoundException('profile for provided user id was not found')
        }

        return profile
    }

    async update(id: number, newProfile: UpdateProfileDTO) {
        const profile = await this.findOne(id)

        return this.profiles.save({ ...profile, ...newProfile })
    }
}
