import { IsDate, IsNumber, IsString } from 'class-validator'

export class CreateAssignmentDTO {
    @IsString()
    description: string

    @IsDate()
    expiresAt: Date

    @IsNumber()
    lessonId: number
}
