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
