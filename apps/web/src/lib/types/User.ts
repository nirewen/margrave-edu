import type { Role } from '$lib/util'
import type { Profile } from './Profile'

export interface User {
    id?: string
    email: string
    role: Role
    createdAt: string
    updatedAt: string
    profile: Profile
}
