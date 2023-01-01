import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const config = {
    db: {
        type: 'postgres',
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '1234',
        database: process.env.DB_NAME || 'margrave',

        synchronize: false,
        logging: false,
        autoLoadEntities: true,
    } satisfies TypeOrmModuleOptions,
    storage: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
    },
}
