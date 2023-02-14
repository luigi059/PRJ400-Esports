import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

const app = express();
// Load the environment variables from a .env file.
dotenv.config();

// Connect to MongoDB
const DB = process.env.DATABASE;
mongoose
  .connect(process.env.MONGODB_URI || DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", routes);

const port = process.env.PORT || 5000;
app.listen(port);
