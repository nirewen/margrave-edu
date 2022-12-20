import { Request } from 'express'

export interface IResponseError {
    method: string
    status: number
    code: string
    message: string
    details: any
}

export interface IResponseArguments {
    request: Request
    status: number
    code: string
    message: string
    details?: any
}
