import express from "express";
import { getLeaderboard } from "../index.js";

const router = express.Router();

// get random item
router.get("/", async (req, res) => {
  var namesString = await getLeaderboard("names_1");
  var scoresString = await getLeaderboard("scores_1");
  var datesString = await getLeaderboard("dates_1");

  var names = namesString?.Item.values.split("@");
  var scores = scoresString?.Item.values.split("@");
  var dates = datesString?.Item.values.split("@");

  console.log("ab");
  res.send({ names, scores, dates });
  // res.send({ namesString });
});

export default router;
