import { PartialType } from '@nestjs/mapped-types'
import { IsArray, IsOptional } from 'class-validator'
import { User } from 'src/entities/user.entity'
import { CreateClassDTO } from './create-class.dto'

export class UpdateClassDto extends PartialType(CreateClassDTO) {
    @IsArray()
    @IsOptional()
    classSubjects: {
        subjectId: string
        weekdays: boolean[]
    }[]

    @IsArray()
    @IsOptional()
    users: User[]
}
