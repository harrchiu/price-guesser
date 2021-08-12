import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import db from "./routes/db.js";
import testRoutes from "./routes/test.js";

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/db", db);
app.use("/test", testRoutes);
app.use("/", (req, res) => {
  console.log(req.body);
  res.send("waiting");
});

dotenv.config();

const uri = process.env.MONGODB_CONNECTIONSTRING;

mongoose.connect(uri, { useNewUrlParser: true }, () =>
  console.log("we are in boys")
);

// const db = mongoose.connection;

// db.once("open", (_) => {
//   console.log("Database connected:", uri);
// });

// db.on("error", (err) => {
//   console.error("connection error:", err);
// });

app.listen(5000);
