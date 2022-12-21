import { PartialType } from '@nestjs/swagger'
import { CreateSubjectDTO } from './create-subject.dto'

export class UpdateSubjectDTO extends PartialType(CreateSubjectDTO) {}
