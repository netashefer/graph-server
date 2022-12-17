
import { Client } from 'pg';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config(); // not ideal, but the only way I managed to make .env readable. TODO: try changing it in the future

export const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: 5432,
    database: process.env.PGDATABASE,
	connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});

async function connectDB() {
    try {
        await client.connect();
        console.log("db connected succesfully");
    } catch (err) {
        console.error("db connection failed", err);
    }
}
export default connectDB;