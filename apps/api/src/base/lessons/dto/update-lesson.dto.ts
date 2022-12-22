import { PartialType } from '@nestjs/mapped-types'
import { CreateLessonDTO } from './create-lesson.dto'

export class UpdateLessonDTO extends PartialType(CreateLessonDTO) {}
