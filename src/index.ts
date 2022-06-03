const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });
const dbconnection = require('../config/dbconnection');
import express from 'express';
import { connectBankerToClientRouter } from './routes/connect_banker_to_connect';
import { createBankerRouter } from './routes/create_banker';
import { createClientRouter } from './routes/create_client';
import { createTransactionRouter } from './routes/create_transaction';
import { deleteClientRouter } from './routes/delete_client';
import { fetchClientRouter } from './routes/fetch_client';
const app = express();

const main = () => {
    dbconnection.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log("Connected");
        app.use(express.json());
        app.use(createClientRouter);
        app.use(createBankerRouter);
        app.use(createTransactionRouter);
        app.use(connectBankerToClientRouter);
        app.use(deleteClientRouter);
        app.use(fetchClientRouter);
        app.listen(8080, () => {
            console.log("Now running on port 8080");
        });
    })
    .catch((error: any) => console.log(error));
}

main();
