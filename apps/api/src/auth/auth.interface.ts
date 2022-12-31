import { UserRole } from 'src/entities/user.entity'

export interface JwtSign {
    access_token: string
    refresh_token: string
}

export interface JwtPayload {
    sub: number
    email: string
    role: UserRole
}

export interface Payload {
    id: string
    email: string
    role: UserRole
}
