import express from "express";
import { router } from "./controller/index";

export const app = express();

// แปลงข้อมูลแบบข้อความทั่วไป (Text Body)
app.use(express.text());

// แปลงข้อมูลรูปแบบ JSON (JSON Body)
app.use(express.json());


app.use("/", router);