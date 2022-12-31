import { IsBoolean, IsString, IsUUID } from 'class-validator'

export class CreateAnswerDTO {
    @IsString()
    content: string

    @IsBoolean()
    final: boolean

    @IsUUID()
    assignmentId: string
}
