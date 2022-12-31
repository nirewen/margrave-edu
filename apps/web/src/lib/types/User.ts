import type { Profile } from './Profile'

export interface User {
    id?: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
    profile: Profile
}
