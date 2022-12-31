import { IsBoolean, IsUUID } from 'class-validator'

export class CreateAttendanceDTO {
    @IsBoolean()
    present: boolean

    @IsUUID()
    userId: string

    @IsUUID()
    lessonId: string
}
