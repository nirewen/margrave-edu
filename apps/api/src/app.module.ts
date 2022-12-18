import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import configuration from './config/configuration'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
    ],
})
export class AppModule {}
