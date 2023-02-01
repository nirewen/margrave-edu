import { PartialType } from '@nestjs/mapped-types'
import { IsArray, IsOptional } from 'class-validator'

import { User } from 'src/entities/user.entity'
import { CreateLessonDTO } from './create-lesson.dto'

export class UpdateLessonDTO extends PartialType(CreateLessonDTO) {
    @IsArray()
    @IsOptional()
    attendances: User[]
}
