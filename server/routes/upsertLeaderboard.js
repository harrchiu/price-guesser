import express from "express";
import { upsertLeaderboard } from "../index.js";

const router = express.Router();

// get random item
router.post("/", async (req, res) => {
  console.log(req.body.names_1);
  console.log(req.body.scores_1);
  console.log(req.body.dates_1);

  var namesArr = req.body.names_1;
  var scoresArr = req.body.scores_1;
  var datesArr = req.body.dates_1;

  var namesString = namesArr.join("@");
  var scoresString = scoresArr.join("@");
  var datesString = datesArr.join("@");

  upsertLeaderboard(
    { values: namesString, info: "names_1" },
    { values: scoresString, info: "scores_1" },
    { values: datesString, info: "dates_1" }
  );

  console.log({ namesString, scoresString, datesString });
  res.send({ namesArr, scoresArr, datesArr });
  // res.send({ namesString });
});

export default router;
