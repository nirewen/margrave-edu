export interface JwtSign {
    access_token: string
    refresh_token: string
}

export interface JwtPayload {
    sub: number
    email: string
    role: string
}

export interface Payload {
    id: number
    email: string
    role: string
}
