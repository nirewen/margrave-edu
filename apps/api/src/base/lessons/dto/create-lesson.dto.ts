import { IsArray, IsDate, IsNumber, IsString } from 'class-validator'

export class CreateLessonDTO {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsDate()
    date: Date

    @IsNumber()
    timespan: number

    @IsArray()
    @IsString({ each: true })
    tags: string[]
}
