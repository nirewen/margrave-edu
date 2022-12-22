import { IsEmail, IsOptional, IsString, Length } from 'class-validator'
import { UserRole } from 'src/entities/user.entity'

export class CreateUserDTO {
    @IsEmail()
    email: string

    @IsString()
    @Length(6)
    password: string

    @IsString()
    @IsOptional()
    role: UserRole
}
