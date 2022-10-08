import express, { Application } from "express";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import { config } from "./config";
import dbconnector from "./db/db";
import dashboardRouter from "./routes/dashboardRoute";
import bodyParser from "body-parser";

const PORT = process.env.PORT || config.port;

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" })); // 100kb default


app.use("/dashboards", dashboardRouter);

// look for services inject

app.use( // look in the office
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);
dbconnector().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
});