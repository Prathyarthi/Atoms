import mongoose from "mongoose";
import { config } from "dotenv";
config()

// mongoDb database connection
const databaseconnect = () => {
  mongoose
    .connect(process.env.MongoDB_URL)
    .then((conn) => console.log(`connected to DB: ${conn.connection.host}`))
    .catch((err) => console.log(err.message));
};

export default databaseconnect;
