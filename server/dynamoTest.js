import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  region: process.env.DB_REGION,
});
AWS.config.credentials = new AWS.Credentials();
AWS.config.credentials.accessKeyId = process.env.ACCESS_KEY_ID;
AWS.config.credentials.secretAccessKey = process.env.SECRET_ACCESS_KEY;
const TABLE_NAME = process.env.TABLE_NAME;
const docClient = new AWS.DynamoDB.DocumentClient();

// read to DB
const getItems = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const items = await docClient.scan(params).promise();
  return items;
};

// upsert DB
const upsertItem = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };
  return await docClient.put(params).promise();
};

const newItem = {
  id: "4",
  name: "henry the asdfasdf",
  health: "wtheck is this",
};

await upsertItem(newItem);
await getItems();
