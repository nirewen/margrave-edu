import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

import { configuration } from './configuration'

dotenv.config()
const ormconfig = async (): Promise<DataSource> => {
    const config = (await configuration()) as { db: DataSourceOptions }

    return new DataSource({
        ...config.db,
        entities: [`${__dirname}/../entities/**/*.{js,ts}`],
        migrations: [`${__dirname}/../migrations/**/*.{js,ts}`],
    })
}

export default ormconfig()
