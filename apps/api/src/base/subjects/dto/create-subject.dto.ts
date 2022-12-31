import { IsHexColor, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator'

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

    @IsUUID()
    teacherId: string
}
