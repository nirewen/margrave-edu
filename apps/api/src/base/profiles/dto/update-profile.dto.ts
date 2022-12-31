import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { Gender } from 'src/entities/profile.entity'

export class UpdateProfileDTO {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    bio: string

    @IsDateString()
    @IsOptional()
    birthdate: String

    @IsEnum(Gender)
    @IsOptional()
    gender: Gender = Gender.OTHER

    // TODO: mover isso pra /api/avatars
    @IsString()
    @IsOptional()
    avatar: string

    @IsNumber()
    @IsOptional()
    @Min(0)
    level: number
}
