import AWS from "aws-sdk";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import getRandomItemRoute from "./routes/getRandomItem.js";
import upsertProductRoute from "./routes/upsertProduct.js";
import scraperTestRoute from "./routes/scrapertest.js";
import getLeaderboardRoute from "./routes/getLeaderboard.js";
import upsertLeaderboardRoute from "./routes/upsertLeaderboard.js";
import resetLeaderboardRoute from "./routes/resetLeaderboard.js";
import getProductByIdRoute from "./routes/getProductById.js";

dotenv.config();

// ----------------------------------- app -----------------------------------
let port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.use("/getRandomItem", getRandomItemRoute);
app.use("/upsertProduct", upsertProductRoute);
app.use("/scraperTest", scraperTestRoute);
app.use("/getLeaderboard", getLeaderboardRoute);
app.use("/upsertLeaderboard", upsertLeaderboardRoute);
app.use("/resetLeaderboard", resetLeaderboardRoute);
app.use("/getProductById", getProductByIdRoute);

app.use("/", (req, res) => {
  res.send("this is the root backend");
});

// ----------------------------------- DynamoDB -----------------------------------
AWS.config.update({
  region: process.env.DB_REGION,
});
AWS.config.credentials = new AWS.Credentials();
AWS.config.credentials.accessKeyId = process.env.ACCESS_KEY_ID;
AWS.config.credentials.secretAccessKey = process.env.SECRET_ACCESS_KEY;
const PRODUCT_TABLE_NAME = process.env.PRODUCT_TABLE_NAME;
const LEADERBOARD_TABLE_NAME = process.env.LEADERBOARD_TABLE_NAME;
const docClient = new AWS.DynamoDB.DocumentClient();

// read all of DB
const getProductById = async (id) => {
  const params = {
    TableName: PRODUCT_TABLE_NAME,
    Key: {
      id,
    },
  };

  var item;
  try {
    item = await docClient.get(params).promise();
  } catch (e) {
    console.log(JSON.stringify(e));
    return { e };
  }

  return item;
};

// get leaderboard DB
const getLeaderboard = async (cnt) => {
  const params = {
    TableName: LEADERBOARD_TABLE_NAME,
    Key: {
      info: cnt,
    },
  };

  var item;
  try {
    item = await docClient.get(params).promise();
  } catch (e) {
    console.log(JSON.stringify(e));
    return { e };
  }

  return item;
};

// upsert leaderboard DB
const upsertLeaderboard = async (names_1, scores_1, dates_1) => {
  const names_params = {
    TableName: LEADERBOARD_TABLE_NAME,
    Item: names_1,
  };
  const scores_params = {
    TableName: LEADERBOARD_TABLE_NAME,
    Item: scores_1,
  };
  const dates_params = {
    TableName: LEADERBOARD_TABLE_NAME,
    Item: dates_1,
  };

  try {
    await docClient.put(names_params).promise();
    await docClient.put(scores_params).promise();
    await docClient.put(dates_params).promise();
  } catch (e) {
    console.log(JSON.stringify(e));
    return { e };
  }
  return { updateLeaderboard: "yup it happened ?" };
};

// upsert product DB
const upsertProduct = async (product) => {
  const params = {
    TableName: PRODUCT_TABLE_NAME,
    Item: product,
  };

  try {
    await docClient.put(params).promise();
  } catch (e) {
    return e;
  }
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port);

export { getProductById, upsertProduct, getLeaderboard, upsertLeaderboard };
