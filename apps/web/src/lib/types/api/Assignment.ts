import { z } from 'zod'
import type { Answer } from './Answer'
import type { Lesson } from './Lesson'

export type Assignment = {
    id: string
    description: string
    expiresAt: string
    lesson: Lesson
    answers: Answer[]
}

export const schema = z.object({
    description: z.string(),
    expiresAt: z.string(),
    lessonId: z.string().uuid().optional(),
})
