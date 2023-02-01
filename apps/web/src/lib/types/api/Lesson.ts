import { z } from 'zod'
import type { User } from '../User'
import type { Assignment } from './Assignment'
import type { Class } from './Class'
import type { Subject } from './Subject'

export type Lesson = {
    id: string
    title: string
    description: string
    date: string
    timespan: number
    tags: string[]
    subject: Subject
    class: Class
    assignments: Assignment[]
    attendances: User[]
}

export const schema = z.object({
    title: z.string(),
    description: z.string(),
    timespan: z.string(),
    date: z.string(),
    tags: z
        .string()
        .optional()
        .transform(tags => tags?.split(',')),
    subjectId: z.string().uuid().optional(),
    classId: z.string().uuid().optional(),
})

export const assignmentsSchema = z.object({
    attendances: z
        .record(z.string(), z.string())
        .optional()
        .transform(obj => (obj ? Object.keys(obj).map(id => ({ id })) : [])),
})
