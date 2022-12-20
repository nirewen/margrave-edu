import { PartialType } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'
import { User, UserRole } from 'src/entities/user.entity'

export class UpdateUserDTO {
    @IsEmail()
    email: string

    @IsString()
    @Length(6)
    password: string

    @IsString()
    role?: UserRole
}
