import { Banker } from "../src/entities/Banker";
import { DataSource } from "typeorm";
import { Client } from "../src/entities/Client"
import { Transaction } from "../src/entities/Transaction";

const dbconnection = new DataSource({
    type: process.env.TYPEORM_TYPE as 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DB,
    entities: [Client, Banker, Transaction],
    synchronize: true
});

module.exports = dbconnection;
