const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const petrol_price_list = require("../models/petrol");

exports.Scrapper = () => {
  request(
    "https://www.ndtv.com/fuel-prices/petrol-price-in-all-state",
    (error, response, body) => {
      if (error) {
        console.error(error);
      } else {
        const $ = cheerio.load(body);
        let petrolDataFromWebsite = [];
        $("table tr").each((index, element) => {
          if (index > 0) {
            petrolDataFromWebsite.push({
              state: $(element).find("td").eq(0).text(),
              price: $(element).find("td").eq(1).text().split(" ")[0],
              change: $(element).find("td").eq(2).text(),
            });
          }
        });

        if (petrolDataFromWebsite.length) {
          fs.writeFile(
            "data.json",
            JSON.stringify(petrolDataFromWebsite),
            (err) => {
              if (err) throw err;
              console.log("Data saved to file");
            }
          );
          petrol_price_list.insertMany(
            petrolDataFromWebsite,
            function (err, docs) {
              if (err) {
                console.error(err);
              } else {
                console.log("Prices save to db...", docs.length);
              }
            }
          );
        }
      }
    }
  );
};
