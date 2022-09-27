import express, { Application } from "express";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import { config } from "./config";

const PORT = process.env.PORT || config.port;

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get("/example", async (_req, res) => {
    res.send({
        message: "pong",
    });
});

app.use( // look in the office
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});