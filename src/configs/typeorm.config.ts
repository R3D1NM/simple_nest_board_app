import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from 'dotenv'
dotenv.config()

export const typeORMConfig : TypeOrmModuleOptions = {
    //Database Type
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER_ID,
    password: process.env.DB_USER_PASSWORD,
    database: 'board-app',
    entities: [
        "src/entity/**/*.ts"
    ],
    synchronize: true,
}