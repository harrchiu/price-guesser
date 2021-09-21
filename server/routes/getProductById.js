import express from "express";
import { getProductById } from "../index.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("here");
  try {
    const product = await getProductById(id);
    if (product !== {}) res.send(product.Item);
    else res.send({ error: "no product found" });
  } catch (error) {
    res.send({ error });
  }
});

export default router;
