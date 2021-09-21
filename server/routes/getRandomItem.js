import express from "express";
import { getProductById } from "../index.js";

const router = express.Router();

// get random item
router.get("/:count", async (req, res) => {
  var retQuantity = req.params.count;

  const productTableInfo = await getProductById("-1");

  const PRODUCT_DB_ITEM_COUNT = productTableInfo?.Item?.productCount ?? 5;

  if (retQuantity > PRODUCT_DB_ITEM_COUNT) retQuantity = PRODUCT_DB_ITEM_COUNT; // all diff, all random

  var retItems = [];
  var usedIds = [];
  var randId;
  for (var i = 0; i < retQuantity; i++) {
    do {
      randId = Math.floor(Math.random() * PRODUCT_DB_ITEM_COUNT) + 1;
    } while (usedIds.includes(randId));

    var response = await getProductById(randId.toString());
    retItems.push(response.Item);
    usedIds.push(randId);
  }
  res.send(retItems);
});

export default router;
