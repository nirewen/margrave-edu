import { PartialType } from '@nestjs/mapped-types'
import { CreateSubjectDTO } from './create-subject.dto'

export class UpdateSubjectDTO extends PartialType(CreateSubjectDTO) {}
