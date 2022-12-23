import { IsBoolean, IsNumber } from 'class-validator'

export class CreateAttendanceDTO {
    @IsBoolean()
    present: boolean

    @IsNumber()
    userId: number

    @IsNumber()
    lessonId: number
}
