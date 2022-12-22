import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class CreateAnswerDTO {
    @IsString()
    content: string

    @IsBoolean()
    final: boolean

    @IsNumber()
    assignmentId: number
}
