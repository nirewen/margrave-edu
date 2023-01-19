import type { Assignment } from './Assignment'
import type { User } from '../User'

export type Answer = {
    id: string
    content: string
    final: boolean
    assignment: Assignment
    user: User
}
