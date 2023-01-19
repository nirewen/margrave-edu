import type { Classroom } from './Classroom'
import type { ClassSubject } from './ClassSubject'
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
    classSubjects: ClassSubject[]
    users: User[]
}
