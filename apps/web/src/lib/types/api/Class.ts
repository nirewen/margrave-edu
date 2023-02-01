import { z } from 'zod'
import type { Classroom } from './Classroom'
import type { Subject } from './Subject'
import type { Lesson } from './Lesson'
import type { User } from '../User'

export enum Shift {
    MORNING = 'MORNING',
    AFTERNOON = 'AFTERNOON',
    NIGHT = 'NIGHT',
}

export type Class = {
    id: string
    number: string
    period: string
    shift: Shift
    classroom: Classroom
    lessons: Lesson[]
    subjects: Subject[]
    users: User[]
}

export const schema = z.object({
    id: z.string().uuid().optional(),
    number: z.string(),
    period: z.string().regex(/^\d{4}\/\d$/, 'período deve seguir o padrão ano/frac'),
    shift: z.enum(['MORNING', 'AFTERNOON', 'NIGHT']),
    classroomId: z.string().uuid(),
    subjects: z.array(z.string().uuid()).optional(),
    users: z.array(z.string().uuid()).optional(),
})
