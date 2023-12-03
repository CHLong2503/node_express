import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import router from "./routes/index.js";
dotenv.config();

const PORT = process.env.PORT;
const URL_MONGODB = process.env.URL_MONGODB;
const app = express();

//connect to DB
connect(URL_MONGODB);

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
