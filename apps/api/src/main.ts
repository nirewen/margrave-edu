import { json, urlencoded } from 'express'
import * as cookieParser from 'cookie-parser'

import { ClassSerializerInterceptor, ValidationPipe, Logger as NestLogger } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'

import { JwtAuthGuard } from './auth/guards'
import { GlobalExceptionFilter } from './common/filters/exceptions.filter'
import { Logger } from 'nestjs-pino'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('/api')

    app.use(cookieParser())
    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ extended: true, limit: '50mb' }))

    app.useLogger(app.get(Logger))
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.useGlobalFilters(new GlobalExceptionFilter())
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))

    await app.listen(3001)
}

;(async (): Promise<void> => {
    try {
        const url = await bootstrap()
        NestLogger.log(url, 'Bootstrap')
    } catch (error) {
        NestLogger.error(error, 'Bootstrap')
    }
})()
