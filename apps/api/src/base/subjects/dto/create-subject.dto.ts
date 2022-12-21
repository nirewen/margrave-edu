import { IsHexColor, IsNumber, IsString, Min } from 'class-validator'

export class CreateSubjectDTO {
    @IsString()
    name: string

    @IsHexColor()
    color: string

    @IsString()
    icon: string

    @IsString()
    type: string

    @IsNumber()
    @Min(20)
    hours: number

    @IsNumber()
    teacherId: number
}
