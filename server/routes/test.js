import express from "express";
import cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

const router = express.Router();

const test = (url) => {
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

    // console.log($(".p13n-sc-truncate", "a").last());

    var titles = [];
    $(".p13n-sc-truncate").each((item) => {
      titles.push($(this).text());
    });
    console.log("here are the titles:", titles);

    var product = {
      title: $(".p13n-sc-truncate", "a").first().text().trim(),
      price: $(".p13n-sc-price", "span").first().text().trim(),
      this: $(".p13n-sc-truncate", "a").first().text().trim(),
    };
    console.log(product);

    return product;
  });

  return Promise.all(testRequest);
};

router.get("/", (req, res) => {
  res.send(
    test(
      "https://www.amazon.ca/Best-Sellers-Gift-Cards/zgbs/gift-cards/ref=zg_bs_gift-cards_home_all?pf_rd_p=de43c7c4-89ee-4a4d-9cea-b3a73600c28b&pf_rd_s=center-1&pf_rd_t=2101&pf_rd_i=home&pf_rd_m=A3DWYIK6Y9EEQB&pf_rd_r=J23MEEN956S00CAQF4N3&pf_rd_r=J23MEEN956S00CAQF4N3&pf_rd_p=de43c7c4-89ee-4a4d-9cea-b3a73600c28b"
    ).toString()
  );
});

export default router;
