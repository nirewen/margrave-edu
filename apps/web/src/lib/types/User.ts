import type { RoleID } from '$lib/util'
import type { Profile } from './Profile'

export interface User {
    id?: string
    email: string
    role: RoleID
    createdAt: string
    updatedAt: string
    profile: Profile
}

export interface PartialUser {
    id?: string
    email: string
    role?: RoleID
    profile: Partial<Profile>
}
