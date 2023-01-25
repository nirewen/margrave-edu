import { IsArray } from 'class-validator'

export class CreateClassSubjectDTO {
    @IsArray()
    weekdays: boolean[]
}
