import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.ts";
import { ConnectMongo } from "./utils/DB.ts";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

app.listen(port, async () => {
  await ConnectMongo();
  console.log(`Server listening to ${port}`);
});
