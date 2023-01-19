import type { Answer } from './Answer'
import type { Lesson } from './Lesson'

export type Assignment = {
    id: string
    description: string
    expiresAt: Date
    lesson: Lesson
    answers: Answer[]
}
