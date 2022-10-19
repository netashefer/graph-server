import express, { Application } from "express";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import { config } from "./config";
import connectDB from "./db/db";
import dashboardRouter from "./routes/dashboardRoute";
import widgetRouter from "./routes/widegtRoute";
import graphRouter from "./routes/graphRoute";
import bodyParser from "body-parser";

const PORT = process.env.PORT || config.port;

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" })); // 100kb default


app.use("/dashboards", dashboardRouter);
app.use("/graphs", graphRouter);
app.use("/widgets", widgetRouter);

// look for services inject
// look for error middleware

app.use( // look in the office
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
});