import { z } from 'zod'

import type { Class } from './Class'
import type { Lesson } from './Lesson'
import type { User } from '../User'

export type Subject = {
    id: string
    name: string
    color: string
    icon: string
    type: string
    hours: number
    teacher: User
    lessons: Lesson[]
    classes: Class[]
}

export const schema = z.object({
    name: z.string(),
    color: z.string().regex(/^#[0-9a-f]{3,6}$/i),
    icon: z.string(),
    type: z.string(),
    hours: z.coerce.number(),
    teacherId: z.string().uuid(),
})
