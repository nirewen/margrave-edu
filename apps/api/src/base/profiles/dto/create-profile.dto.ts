import { IsDate, IsNumber, IsString, Min } from 'class-validator'

export class CreateProfileDTO {
    @IsNumber()
    id: number

    @IsString()
    name?: string

    @IsString()
    bio?: string

    @IsDate()
    birthdate?: Date

    @IsString()
    avatar?: string

    @IsNumber()
    @Min(0)
    level?: number
}
