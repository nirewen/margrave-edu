import type { Profile } from './profile'

export interface User {
    id: number
    email: string
    role: string
    createdAt: string
    updatedAt: string
    profile: Profile
}
