import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from './common/common.module'

import { configuration } from './config/configuration'

@Module({
    imports: [
        AuthModule,
        CommonModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                ...config.get<TypeOrmModuleOptions>('db'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
