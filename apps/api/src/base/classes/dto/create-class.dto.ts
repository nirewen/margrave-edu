import { IsString } from 'class-validator'
import { Shift } from 'src/entities/class.entity'

export class CreateClassDTO {
    @IsString()
    number: string

    @IsString()
    period: string

    @IsString()
    shift: Shift
}
