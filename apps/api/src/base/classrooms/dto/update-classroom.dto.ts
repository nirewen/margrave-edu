import { PartialType } from '@nestjs/swagger'
import { CreateClassroomDTO } from './create-classroom.dto'

export class UpdateClassroomDTO extends PartialType(CreateClassroomDTO) {}
