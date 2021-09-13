import express from "express";
import { getItems, upsertItem } from "../index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await getItems();
  console.log(items);
  res.send(JSON.stringify(items));
});

// router.post("/", (req, res) => {
// });

export default router;
