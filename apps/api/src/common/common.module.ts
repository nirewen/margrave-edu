import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerContextMiddleware } from './middlewares/logger-context.middleware'

import { ConfigService } from './providers/config.service'
import { SupabaseService } from './providers/supabase.service'

@Global()
@Module({
    providers: [ConfigService, SupabaseService],
    exports: [ConfigService, SupabaseService],
})
export class CommonModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerContextMiddleware).forRoutes('*')
    }
}
