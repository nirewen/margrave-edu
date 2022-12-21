import { PartialType } from '@nestjs/swagger'
import { CreateClassDTO } from './create-class.dto'

export class UpdateClassDto extends PartialType(CreateClassDTO) {}
