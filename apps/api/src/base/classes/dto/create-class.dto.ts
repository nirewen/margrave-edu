import { IsArray, IsEnum, IsOptional, IsString, IsUUID, Matches } from 'class-validator'
import { ClassSubject } from 'src/entities/class-subject.entity'
import { Shift } from 'src/entities/class.entity'

export class CreateClassDTO {
    @IsString()
    number: string

    @IsString()
    @Matches(/\d{4}\/\d/, { message: 'period must match year/slice. ex.: 2022/2' })
    period: string

    @IsString()
    @IsEnum(Shift)
    shift: Shift

    @IsUUID()
    classroomId: string

    @IsArray()
    @IsOptional()
    classSubjects: {
        subjectId: string
        weekdays: boolean[]
    }[]
}
