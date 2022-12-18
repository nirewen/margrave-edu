export const config = {
    db: {
        entities: [`${__dirname}/../../entities/**/*.entity.{js,ts}`],
        // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
        migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
    },
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
}
