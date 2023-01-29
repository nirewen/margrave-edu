import type { Answer } from './Answer'
import type { Lesson } from './Lesson'

export type Assignment = {
    id: string
    description: string
    expiresAt: string
    lesson: Lesson
    answers: Answer[]
}
