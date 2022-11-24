import "reflect-metadata"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import routes from "./routes"
import { DataSource } from "typeorm"
require("dotenv").config()

//Initialize DB
export const AppDataSource = new DataSource({
    name: "default",
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_USER,
    synchronize: true,
    logging: false,
    entities: ["./src/entity/*"],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    app.use(cors())
    app.use(routes)

    // start express server
    app.listen(process.env.PORT || 3333, () => {
        console.log("Servidor em Execução");
    });

    app.use((error, req, res, next) => {
        res.status(400).send(error.message);
    })

}).catch(error => console.log(error))
