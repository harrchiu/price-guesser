import express from "express";
import { getItemById, upsertItem } from "../index.js";

const router = express.Router();

// get random item
router.get("/", async (req, res) => {
  const randId = "4"; //Math.random;
  var item;

  item = await getItemById(randId);
  res.send(item.Item);
});

// router.post("/", (req, res) => {
// });

export default router;
