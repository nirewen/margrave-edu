import { Injectable, NestMiddleware } from '@nestjs/common'
import type { Request, Response } from 'express'
import { PinoLogger } from 'nestjs-pino'
import { Payload } from 'src/auth/auth.interface'

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
    constructor(private readonly logger: PinoLogger) {}

    public use(req: Request, _res: Response, next: () => void): void {
        const user = req.user as Payload | undefined

        if (user) {
            this.logger.assign({ user: user.id })
        }

        return next()
    }
}
