import express from "express";
import dotenv from "dotenv";
import { ConnectMongo } from "./utils/DB.ts";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.listen(port, async () => {
  await ConnectMongo();
  console.log(`Server listening to ${port}`);
});
