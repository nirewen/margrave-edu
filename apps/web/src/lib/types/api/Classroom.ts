import { z } from 'zod'
import type { Class } from './Class'

export enum ClassroomType {
    REGULAR = 'REGULAR',
    COMPUTER = 'COMPUTER',
    LABORATORY = 'LABORATORY',
    GYMNASIUM = 'GYMNASIUM',
}

export type Classroom = {
    id: string
    building: string
    capacity: number
    type: ClassroomType
    classes: Class[]
}

export const schema = z.object({
    building: z.string(),
    capacity: z.coerce.number(),
    type: z.enum(['REGULAR', 'COMPUTER', 'LABORATORY', 'GYMNASIUM']),
})
