import express from "express";
import cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

const router = express.Router();

const test = async (url) => {
  const res = await fetch(url);

  const html = await res.text();
  // const $ = cheerio.load(
  //   '<span><a><div class="p13n-sc-truncate" title="asldkf">hello</div></a></span>'
  // );
  const $ = cheerio.load(html);

  // fs.writeFile("Output2.txt", html, (err) => {
  //   // In case of a error throw err.
  //   if (err) throw err;
  // });

  var titles = [];
  var prices = [];
  var images = [];
  $(
    // ".s-image"
    // ".s-image-square-aspect",
    // ".s-no-outline"
    "[class*=widgetId=search-results_]"
  ).each((index, element) => {
    titles.push($(element).find(" .s-image").attr("alt").trim());
    images.push($(element).find(" .s-image").attr("src").trim());
    prices.push($(element).find(".a-price .a-offscreen").text().trim());
  });

  for (var i = 0; i < titles.length; i++) {
    console.log(titles[i]);
  }
  for (var i = 0; i < prices.length; i++) {
    console.log(prices[i]);
  }
  for (var i = 0; i < images.length; i++) {
    console.log(images[i]);
  }

  return { titles, images, prices };
};

router.get("/", async (req, res) => {
  var link =
    req.body?.link ??
    "https://www.amazon.ca/s?k=office+items&rh=n%3A6304012011&dc&qid=1632012670&rnid=5264023011&ref=sr_nr_n_1";
  const testResult = await test(link);
  res.send(testResult);
  //"https://www.amazon.ca/s?k=office+items&rh=n%3A6304012011&dc&qid=1632012670&rnid=5264023011&ref=sr_nr_n_1"
});

export default router;
