import { PartialType } from '@nestjs/swagger'
import { CreateAssignmentDTO } from './create-assignment.dto'

export class UpdateAssignmentDTO extends PartialType(CreateAssignmentDTO) {}
