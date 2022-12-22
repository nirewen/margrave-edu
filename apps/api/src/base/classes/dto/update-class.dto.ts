import { PartialType } from '@nestjs/mapped-types'
import { CreateClassDTO } from './create-class.dto'

export class UpdateClassDto extends PartialType(CreateClassDTO) {}
