import * as cookieParser from 'cookie-parser'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { GlobalExceptionFilter } from './common/filters/exceptions.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('/api')
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(new GlobalExceptionFilter())

    app.use(cookieParser())

    await app.listen(3001)
}

bootstrap()
