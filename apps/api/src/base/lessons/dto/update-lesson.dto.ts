import { PartialType } from '@nestjs/swagger'
import { CreateLessonDTO } from './create-lesson.dto'

export class UpdateLessonDTO extends PartialType(CreateLessonDTO) {}
