import { PartialType } from '@nestjs/mapped-types'
import { CreateAssignmentDTO } from './create-assignment.dto'

export class UpdateAssignmentDTO extends PartialType(CreateAssignmentDTO) {}
