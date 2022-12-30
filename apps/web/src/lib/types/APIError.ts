export class APIError {
    method: string
    status: number
    code: string
    message: string
    details: any

    constructor({ method, status, code, message, details }: APIError) {
        this.method = method
        this.status = status
        this.code = code
        this.message = message
        this.details = details
    }
}
