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
