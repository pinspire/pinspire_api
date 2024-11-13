import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import pinRouter from "./routes/pin.js";

//connect to the database
await mongoose.connect(process.env.MONGO_URI);

//create the express app
const app = express();

//use middlewares
app.use(express.json());
app.use(cors());

//routes will be used here

app.use(userRouter);
app.use(pinRouter);

//listening for incoming requests

app.listen(3700,()=>{
    console.log("App is listening on port 3700");
});