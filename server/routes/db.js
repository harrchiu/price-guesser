import express from "express";
import cheerio from "cheerio";
import fetch from "node-fetch";
import Product from "../models/Product.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("yupper");
// });

router.get("/", async (req, res) => {
  var allp = Product.find(
    { seller: "asdfs" },
    "seller price imageSrc",
    (err, product) => {
      if (err) return handleError(err);
      // Prints "Space Ghost is a talk show host".
      console.log(
        "%s %s is a %s.",
        product.seller,
        product.price,
        product.imageSrc
      );
    }
  );

  res.send(allp.seller);
  // res.json(Product.find());
  // await Product.find({});
});

router.post("/", (req, res) => {
  const product = new Product({
    seller: req.body.seller,
    title: req.body.title,
    description: req.body.description,
    imageSrc: req.body.imageSrc,
    price: req.body.price,
  });
  // save instance to db
  product
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

export default router;
