import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.ts";
import eventRouter from "./routes/event.route.ts";
import guestRouter from "./routes/guest.route.ts";

import { ConnectMongo } from "./utils/DB.ts";
import { scheduleEventReminder } from "./utils/emailReminder/scheduleEventReminder.ts";

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

scheduleEventReminder();

app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);
app.use("/api/guest", guestRouter);

app.listen(port, async () => {
  await ConnectMongo();
  console.log(`Server listening to ${port}`);
});
