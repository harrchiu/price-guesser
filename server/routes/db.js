import express from "express";
import Product from "../models/Product.js";

import mongoose from "mongoose";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("yupper");
// });

router.get("/", async (req, res) => {
  console.log("hello");
  try {
    // var found = await Product.find({ seller: "hello" });
    var found = await Product.find({});
    console.log(found.body);
    // var found = await Product.findById("61149a2517cca0abcdf63bc8");
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }

  // console.log("this", found.body);
  // res.json(found.body);

  return;
  var collections = mongoose.connections[0].collections;
  var names = [];

  Object.keys(collections).forEach(function (k) {
    names.push(k);
  });

  console.log(names);
  return;

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
