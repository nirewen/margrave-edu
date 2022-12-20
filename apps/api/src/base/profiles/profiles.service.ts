import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Profile } from 'src/entities/profile.entity'
import { Repository } from 'typeorm'
import { CreateProfileDTO } from './dto/create-profile.dto'
import { UpdateProfileDTO } from './dto/update-profile.dto'

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private profiles: Repository<Profile>) {}

    async create(newProfile: CreateProfileDTO) {
        const profile = this.profiles.create(newProfile)

        return this.profiles.save(profile)
    }

    async findAll() {
        return this.profiles.find()
    }

    async findOne(userId: number) {
        return this.profiles.findOneBy({ id: userId })
    }

    async update(id: number, newProfile: UpdateProfileDTO) {
        const profile = await this.findOne(id)

        return this.profiles.save({ ...profile, ...newProfile })
    }

    async remove(id: number) {
        const profile = await this.findOne(id)

        return this.profiles.remove(profile)
    }
}
