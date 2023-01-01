import { Type } from 'class-transformer'
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator'
import { Gender } from 'src/entities/profile.entity'

export class UpdateProfileDTO {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    bio: string

    @IsDateString()
    @IsOptional()
    birthdate: string

    @IsEnum(Gender)
    @IsOptional()
    gender: Gender = Gender.OTHER

    // TODO: mover isso pra /api/avatars
    @IsString()
    @IsOptional()
    avatar: string

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @Min(0)
    level: number
}
