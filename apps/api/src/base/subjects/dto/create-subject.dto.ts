import { IsHexColor, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class CreateSubjectDTO {
    @IsString()
    name: string

    @IsHexColor()
    @IsOptional()
    color: string

    @IsString()
    @IsOptional()
    icon: string

    @IsString()
    @IsOptional()
    type: string

    @IsNumber()
    @IsOptional()
    @Min(20)
    hours: number

    @IsNumber()
    teacherId: number
}
