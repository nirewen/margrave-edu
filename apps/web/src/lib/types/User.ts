import type { RoleID } from '$lib/util'
import { z } from 'zod'
import type { Profile } from './Profile'

export interface User {
    id: string
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

export const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const profileSchema = z.object({
    user: z.intersection(
        schema,
        z.object({
            role: z.enum(['ADMIN', 'TEACHER', 'STUDENT']),
            password: z.string().optional(),
        })
    ),
    name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
    bio: z.string().optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    birthdate: z.string().regex(/^\d{4}-[01]\d-[0-3]\d$/, 'Data deve ser uma data válida'),
    level: z.coerce.number(),
    avatar: z.instanceof(Blob),
})
