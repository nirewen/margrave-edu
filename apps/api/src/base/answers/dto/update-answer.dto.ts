import { PartialType } from '@nestjs/mapped-types'
import { CreateAnswerDTO } from './create-answer.dto'

export class UpdateAnswerDTO extends PartialType(CreateAnswerDTO) {}
