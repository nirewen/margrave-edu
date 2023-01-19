import type { Lesson } from './Lesson'
import type { User } from '../User'

export type Attendance = {
    id: string
    present: boolean
    user: User
    lesson: Lesson
}
