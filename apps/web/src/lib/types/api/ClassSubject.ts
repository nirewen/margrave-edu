import type { Class } from './Class'
import type { Subject } from './Subject'

export type Weekdays = Record<number, boolean>

export type ClassSubject = {
    id?: string
    weekdays: Weekdays
    subject: Subject
    class: Class
}
