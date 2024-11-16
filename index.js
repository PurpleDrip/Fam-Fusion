import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import connecttoDB from "./Config/connecttoDB.js";
import connecttoRedis from "./Config/connecttoRedis.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

connecttoDB();
connecttoRedis();
