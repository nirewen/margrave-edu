import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { randomUUID } from 'crypto'
import { SupabaseService } from 'src/common/providers/supabase.service'
import { decodeBase64 } from 'src/common/utils'
import { Profile } from 'src/entities/profile.entity'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { UpdateProfileDTO } from './dto/update-profile.dto'

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile) private readonly profiles: Repository<Profile>,
        private readonly usersService: UsersService,
        private readonly supabaseService: SupabaseService
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

    async uploadAvatar(name: string, type: string, buffer: Buffer) {
        const { data, error } = await this.supabaseService.storage
            .from('avatars')
            .upload(name, buffer, { upsert: true, contentType: `image/${type}` })

        if (error) throw error

        return data
    }

    async update(id: string, body: UpdateProfileDTO) {
        const profile = await this.findOne(id)

        if (body.user) {
            await this.usersService.update(id, body.user)
        }

        if (body.avatar) {
            const { type, buffer } = decodeBase64(body.avatar)
            const name = id + '.' + type
            const { path } = await this.uploadAvatar(name, type, buffer)

            body.avatar = '/api/avatar/' + path
        } else {
            body.avatar = profile.avatar
        }

        return this.profiles.save({ ...profile, ...body })
    }
}
