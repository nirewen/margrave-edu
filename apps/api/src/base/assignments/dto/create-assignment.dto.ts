import { IsDateString, IsString, IsUUID } from 'class-validator'

export class CreateAssignmentDTO {
    @IsString()
    description: string

    @IsDateString()
    expiresAt: string

    @IsUUID()
    lessonId: string
}
