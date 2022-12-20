import { PartialType } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { Profile } from 'src/entities/profile.entity'

export class CreateProfileDTO {
    @IsNumber()
    id: number
}
