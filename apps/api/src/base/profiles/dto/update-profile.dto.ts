import { PartialType } from '@nestjs/swagger'
import { Profile } from 'src/entities/profile.entity'

export class UpdateProfileDTO extends PartialType(Profile) {}
