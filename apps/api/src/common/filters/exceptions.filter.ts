import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
    UnauthorizedException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from 'typeorm'
import { GlobalResponseError } from './global.response.error'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        let message = (exception as any).message
        let code = 'HttpException'
        let details = (exception as any).response.message

        // Logger.error(message, (exception as any).stack, `${request.method} ${request.url}`)

        let status = HttpStatus.INTERNAL_SERVER_ERROR

        if (exception instanceof HttpException) {
            status = (exception as HttpException).getStatus()
        }
        if (exception instanceof QueryFailedError) {
            // this is a TypeOrm error
            status = HttpStatus.UNPROCESSABLE_ENTITY
            message = (exception as QueryFailedError).message
            code = (exception as any).code
        }
        if (exception instanceof EntityNotFoundError) {
            // this is another TypeOrm error
            status = HttpStatus.UNPROCESSABLE_ENTITY
            message = (exception as EntityNotFoundError).message
            code = (exception as any).code
        }
        if (exception instanceof CannotCreateEntityIdMapError) {
            // and another
            status = HttpStatus.UNPROCESSABLE_ENTITY
            message = (exception as CannotCreateEntityIdMapError).message
            code = (exception as any).code
        }

        response.status(status).json(GlobalResponseError({ status, message, details, code, request }))
    }
}
