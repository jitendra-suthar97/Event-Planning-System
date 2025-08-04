import { connect } from "mongoose";

export const ConnectMongo = async () => {
  const uri = process.env.MONGO_URI!;
  try {
    await connect(uri);
    console.log("Connected to Mongo");
  } catch (error) {
    console.log(`Error while connecting to Mongo: ${error.message}`);
    process.exit(1);
  }
};
