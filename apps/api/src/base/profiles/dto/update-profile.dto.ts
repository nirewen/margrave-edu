import { Transform, Type } from 'class-transformer'
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min, ValidateIf } from 'class-validator'
import { UpdateUserDTO } from 'src/base/users/dto/update-user.dto'
import { Gender } from 'src/entities/profile.entity'

export class UpdateProfileDTO {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    bio: string

    @IsDateString()
    // @ValidateIf((o, value) => value !== '')
    @Transform(({ value }) => (value !== '' ? value : undefined))
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

    @IsOptional()
    user: UpdateUserDTO
}
