import express from "express";
import { upsertLeaderboard } from "../index.js";

const router = express.Router();

// get random item
router.get("/", async (req, res) => {
  upsertLeaderboard(
    {
      info: "names_1",
      values:
        "eric@ryan@albert@harrison@steven@eric@ryan@albert@harrison@steven@laura@laura",
    },
    { info: "scores_1", values: "30@20@10@9@8@7@6@5@4@3@2@1" },
    {
      info: "dates_1",
      values:
        "1631981502@1631949346@1631949347@1631949348@1631949349@1631949350@1631949351@1631949352@1631949353@1631949354@1631949355@1631949326",
    }
  );

  res.send("resetted");
  // res.send({ namesString });
});

export default router;
