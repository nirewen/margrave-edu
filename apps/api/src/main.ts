import { json, urlencoded } from 'express'
import * as cookieParser from 'cookie-parser'

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'

import { JwtAuthGuard } from './auth/guards'
import { GlobalExceptionFilter } from './common/filters/exceptions.filter'
import * as morgan from 'morgan'
import { blue, green, red, white, whiteBright, yellow, yellowBright } from 'colorette'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('/api')

    app.use(
        morgan((tokens, req, res) => {
            const method = tokens.method(req, res)
            const methodColor = {
                GET: blue,
                POST: green,
                DELETE: red,
                PUT: yellow,
                PATCH: yellowBright,
            }[method]

            return [
                green('[Nest]'),
                green(process.pid),
                ' -',
                whiteBright(
                    Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                    }).format(new Date())
                ),
                methodColor(method.padStart(7, ' ')),
                yellow(tokens.status(req, res)),
                white(tokens.url(req, res)),
            ].join(' ')
        })
    )
    app.use(cookieParser())
    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ extended: true, limit: '50mb' }))

    // app.useLogger(app.get(Logger))
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.useGlobalFilters(new GlobalExceptionFilter())
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))

    await app.listen(3001)
}

bootstrap()
