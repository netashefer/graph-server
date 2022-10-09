import bodyParser from "body-parser";
import cors from 'cors';
import express, { Application } from "express";
import fs from 'fs';
import swaggerUi from "swagger-ui-express";
import { verifyJwt } from "./auth/auth";
import { config } from "./config";
import connectDB from "./db/db";
import dashboardRouter from "./routes/dashboardRoute";
const https = require('https');

const PORT = process.env.PORT || config.port;

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" })); // 100kb default

const key = fs.readFileSync(__dirname + '/cert.key',  'utf8');
const cert = fs.readFileSync(__dirname + '/cert.crt',  'utf8');
const options = {
  key: key,
  cert: cert
};

app.use(verifyJwt)
app.use("/dashboards", dashboardRouter);
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

const server = https.createServer(options, app);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
});