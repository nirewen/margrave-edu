import { IsArray, IsDate, IsString, IsUUID } from 'class-validator'

export class CreateLessonDTO {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsDate()
    date: Date

    @IsUUID()
    timespan: number

    @IsArray()
    @IsString({ each: true })
    tags: string[]

    @IsUUID()
    classId: string

    @IsUUID()
    subjectId: string
}
