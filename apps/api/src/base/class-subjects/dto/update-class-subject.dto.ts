import { PartialType } from '@nestjs/mapped-types'
import { CreateClassSubjectDTO } from './create-class-subject.dto'

export class UpdateClassSubjectDTO extends PartialType(CreateClassSubjectDTO) {}
