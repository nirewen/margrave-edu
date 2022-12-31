import { IsDate, IsEnum, IsNumber, IsString, Min } from 'class-validator'
import { Gender } from 'src/entities/profile.entity'

export class UpdateProfileDTO {
    @IsString()
    name?: string

    @IsString()
    bio?: string

    @IsDate()
    birthdate?: Date

    @IsEnum(Gender)
    gender?: Gender

    @IsString()
    avatar?: string

    @IsNumber()
    @Min(0)
    level?: number
}
