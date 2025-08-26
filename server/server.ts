import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import {connectDB} from './pool';
const app = express();
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 5174;
dotenv.config();
import morgan from "morgan";
import { Request, Response } from 'express';

//Routers
import UserRouter from './Routers/UserRouter'

app.use(cors());
app.use(express.json());
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.listen(PORT, async (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log(`Server is running on port: ${PORT}`);
    await connectDB();
});

// pool.connect((err, connection) => {
//     if (err) throw err;
//     console.log("Connected to connector database successfully");
// })

app.use("/api/user", UserRouter);
