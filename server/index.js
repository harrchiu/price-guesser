import AWS from "aws-sdk";
import dotenv from "dotenv";
import express from "express";

import getRandomItemRoute from "./routes/getRandomItem.js";
import upsertItemRoute from "./routes/upsertItem.js";
import scraperTestRoute from "./routes/scrapertest.js";

dotenv.config();

// ----------------------------------- app -----------------------------------
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/getRandomItem", getRandomItemRoute);
app.use("/upsertItem", upsertItemRoute);
app.use("/scraperTest", scraperTestRoute);
app.use("/", (req, res) => {
  console.log(req.body);
  res.send("this is the root backend");
});

// ----------------------------------- DynamoDB -----------------------------------
AWS.config.update({
  region: process.env.DB_REGION,
});
AWS.config.credentials = new AWS.Credentials();
AWS.config.credentials.accessKeyId = process.env.ACCESS_KEY_ID;
AWS.config.credentials.secretAccessKey = process.env.SECRET_ACCESS_KEY;
const TABLE_NAME = process.env.TABLE_NAME;
const docClient = new AWS.DynamoDB.DocumentClient();

// read all of DB
const getItemById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };

  var item;
  try {
    item = await docClient.get(params).promise();
  } catch (e) {
    console.log(JSON.stringify(e));
    return {};
  }

  return item;
};

// upsert DB
const upsertItem = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };
  return await docClient.put(params).promise();
};

app.listen(5000);

export { getItemById, upsertItem };
