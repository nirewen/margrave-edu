export const config = {
    db: {
        type: process.env.DB_TYPE || 'postgres',
        synchronize: false,
        logging: true,
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '1234',
        database: process.env.DB_NAME || 'margrave',
        autoLoadEntities: true,
    },
    storage: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
    },
}
