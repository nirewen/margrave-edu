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
