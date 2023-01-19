import { IsEnum, IsNumber, IsString } from 'class-validator'
import { ClassroomType } from 'src/entities/classroom.entity'

export class CreateClassroomDTO {
    @IsString()
    building: string

    @IsNumber()
    capacity: number

    @IsEnum(ClassroomType)
    type: ClassroomType
}
