import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { LoggerModule } from 'nestjs-pino'
import { AuthModule } from './auth/auth.module'
import { BaseModule } from './base/base.module'
import { CommonModule } from './common/common.module'

import { configuration } from './config/configuration'
import { loggerOptions } from './config/logger.config'

@Module({
    imports: [
        AuthModule,
        BaseModule,
        CommonModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        LoggerModule.forRoot(loggerOptions),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                ...config.get<TypeOrmModuleOptions>('db'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
