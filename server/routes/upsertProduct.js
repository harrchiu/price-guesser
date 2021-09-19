import express from "express";
import { upsertProduct } from "../index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const newProduct = req.body.product;
  try {
    await upsertProduct(newProduct);
    console.log(
      "successfully uploaded product with id:",
      req.body?.product?.id
    );
    res.send(newProduct);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});

router.post("/byarrays", async (req, res) => {
  const newProductIds = req.body.ids;
  const newProductTitles = req.body.titles;
  const newProductPrices = req.body.prices;
  const newProductImages = req.body.images;

  var successfullySent = [];
  var unsuccessfullySent = [];

  if (
    newProductIds.length == newProductTitles.length &&
    newProductIds.length == newProductPrices.length &&
    newProductIds.length == newProductImages.length
  ) {
    for (var index = 0; index < newProductIds.length; index++) {
      try {
        await upsertProduct({
            id: newProductIds[index],
            title: newProductTitles[index],
            price: newProductPrices[index],
            img: newProductImages[index],
        });

        successfullySent.push(newProductIds[index]);
      } catch (e) {
        unsuccessfullySent.push(newProductIds[index]);
      }
    }
  } else {
    res.send(
      "array lengths don't match. \n LENGTHS: id, title, price, imgs: ",
      newProductIds.length,
      newProductTitles.length,
      newProductPrices.length,
      newProductImages.length
    );
  }

  res.send({ successfullySent, unsuccessfullySent });
});

export default router;
