import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { GlobalExceptionFilter } from './common/filters/exceptions.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('/api')
    app.useGlobalFilters(new GlobalExceptionFilter())

    await app.listen(3001)
}

bootstrap()
