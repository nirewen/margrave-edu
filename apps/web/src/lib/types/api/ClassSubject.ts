import type { Class } from './Class'
import type { Subject } from './Subject'

export enum Weekday {
    SUNDAY = 1,
    MONDAY = 2,
    TUESDAY = 3,
    WEDNESDAY = 4,
    THURSDAY = 5,
    FRIDAY = 6,
    SATURDAY = 7,
}

export type ClassSubject = {
    id: string
    weekdays: Weekday[]
    subject: Subject
    class: Class
}
