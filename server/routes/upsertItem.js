import express from "express";
import { upsertItem } from "../index.js";

const router = express.Router();

// router.get("/", async (req, res) => {
// });

router.post("/", async (req, res) => {
  console.log(req.body);
  const newItem = req.body;
  try {
    await upsertItem(newItem);
    console.log("successfully uploaded");
    res.send(newItem);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});

const newItem = {
  id: "4",
  name: "henry the asdfasdf",
  health: "wtheck is this",
};

export default router;
