import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// import scraperRoutes from "./routes/scraper.js";
// import testRoutes from "./routes/test.js";

const app = express();

// app.use("/scraper", scraperRoutes);
// app.use("/test", testRoutes);
dotenv.config();

const uri = process.env.MONGODB_CONNECTIONSTRING;

mongoose.connect(uri, { useNewUrlParser: true }, () =>
  console.log("we are in boys")
);

const db = mongoose.connection;

db.once("open", (_) => {
  console.log("Database connected:", uri);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

app.listen(5000);
