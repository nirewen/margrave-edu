import type { Assignment } from './Assignment'
import type { Attendance } from './Attendance'
import type { Class } from './Class'
import type { Subject } from './Subject'

export type Lesson = {
    id: string
    title: string
    description: string
    date: Date
    timespan: number
    tags: string[]
    subject: Subject
    class: Class
    assignments: Assignment[]
    attendances: Attendance[]
}
