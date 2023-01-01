import * as cookieParser from 'cookie-parser'

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'

import { JwtAuthGuard } from './auth/guards'
import { GlobalExceptionFilter } from './common/filters/exceptions.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('/api')
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.useGlobalFilters(new GlobalExceptionFilter())
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))

    app.use(cookieParser())

    await app.listen(3001)
}

bootstrap()
