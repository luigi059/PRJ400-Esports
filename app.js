require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/users");

const app = express();

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

// Routes
app.use("/user", userRouter);

const port = process.env.PORT || 5000;
app.listen(port);
