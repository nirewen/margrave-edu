import { IsDate, IsString, IsUUID } from 'class-validator'

export class CreateAssignmentDTO {
    @IsString()
    description: string

    @IsDate()
    expiresAt: Date

    @IsUUID()
    lessonId: string
}
