export interface APIError {
    method: string
    status: number
    code: string
    message: string
    details: any
}
