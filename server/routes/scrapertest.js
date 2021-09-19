import express from "express";
import cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

const router = express.Router();

const test = async (url) => {
  const urls = [url];

  const testRequest = urls.map(async (url) => {
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
    //".s-result-item"
    $(
      ".s-image",
      ".s-image-square-aspect",
      ".s-no-outline"
      // ".rush-component",
      // ".a-section",
      // ".s-expand-height"
      // "[class^=widgetId=search-results_],"
      // --works kinda ^
      // "div .s-image"
    ).each((index, element) => {
      console.log(element);
      console.log($(element).attr("alt"));
      titles.push($(element).attr("alt").trim());
      images.push($(element).attr("src").trim());
    });

    console.log("here are the titles:", titles);
    console.log("here are the images:", images);
    console.log("here are the prices:", prices);

    return { titles, images, prices };
  });

  return testRequest;
};

router.get("/", async (req, res) => {
  const testResult = await test(
    "https://www.amazon.ca/s?k=office+items&rh=n%3A6304012011&dc&qid=1632012670&rnid=5264023011&ref=sr_nr_n_1"
  );
  res.send(testResult);
});

export default router;
