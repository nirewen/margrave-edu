import { IsArray, IsDate, IsDateString, IsString, IsUUID } from 'class-validator'

export class CreateLessonDTO {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsDateString()
    date: string

    @IsString()
    timespan: string

    @IsArray()
    @IsString({ each: true })
    tags: string[]

    @IsUUID()
    classId: string

    @IsUUID()
    subjectId: string
}
