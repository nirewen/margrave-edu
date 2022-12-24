import { IsEnum } from 'class-validator'
import { Weekday } from 'src/entities/class-subject.entity'

export class CreateClassSubjectDTO {
    @IsEnum(Weekday, { each: true })
    weekdays: Weekday[]
}
