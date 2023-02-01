import { z } from 'zod'

import type { Assignment } from './Assignment'
import type { User } from '../User'

export type Answer = {
    id: string
    content: string
    final: boolean
    assignment: Assignment
    user: User
}

export const schema = z.object({
    content: z.string(),
    final: z
        .string()
        .optional()
        .transform(v => v === 'on'),
    assignmentId: z.string().uuid(),
})
