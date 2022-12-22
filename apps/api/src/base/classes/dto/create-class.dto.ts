import { IsEnum, IsString, Matches } from 'class-validator'
import { Shift } from 'src/entities/class.entity'

export class CreateClassDTO {
    @IsString()
    number: string

    @IsString()
    @Matches(/\d{4}\/\d/, { message: 'period must match year/slice. ex.: 2022/2' })
    period: string

    @IsString()
    @IsEnum(Shift)
    shift: Shift
}
