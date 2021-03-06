import express from "express";
import cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

const router = express.Router();

const test = async (url) => {
  const res = await fetch(url);
  console.log(res);

  const html = await res.text();
  const $ = cheerio.load(html);

  var titles = [];
  var prices = [];
  var images = [];
  $(
    // ".s-image"
    // ".s-image-square-aspect",
    // ".s-no-outline"
    "[class*=widgetId=search-results_]"
  ).each((index, element) => {
    titles.push($(element).find(".s-image").attr("alt").trim());
    images.push($(element).find(".s-image").attr("src").trim());
    prices.push($(element).find(".a-price .a-offscreen").text().trim());
  });

  // for (var i = 0; i < titles.length; i++) {
  //   console.log(titles[i]);
  // }
  // for (var i = 0; i < prices.length; i++) {
  //   console.log(prices[i]);
  // }
  // for (var i = 0; i < images.length; i++) {
  //   console.log(images[i]);
  // }

  return { titles, images, prices };
};

router.post("/", async (req, res) => {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  var link =
    req.body?.link ??
    `https://www.amazon.ca/s?k=${
      letters[Math.floor(Math.random() * letters.length)]
    }`;
  const testResult = await test(link);
  // console.log(req.body);
  res.send(testResult);
});

export default router;
