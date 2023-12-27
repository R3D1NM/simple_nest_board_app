import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import 'dotenv/config'
import * as config from 'config'

const DBConfig = config.get('db')
export const typeORMConfig : TypeOrmModuleOptions = {
    type: DBConfig.type,
    host: DBConfig.host,
    port: DBConfig.port,
    username: process.env.DB_USER_ID,
    password: process.env.DB_USER_PASSWORD,
    database: DBConfig.database,
    autoLoadEntities: true,
    synchronize: DBConfig.synchronize,
}