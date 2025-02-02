/** @format */

import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
import ticketRoute from "./Routes/ticketRoute.js";

const corsOption = {
  origin: process.env.MAIN_PORT,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
};

const app = express();
const port = 6969;

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/ticket", ticketRoute);

try {
  await mongoose.connect(process.env.DB_ID);
  app.listen(port, () => {
    console.log(`adminApp server started at -> ${port} and database connected`);
  });
} catch (error) {
  console.log(error);
}
