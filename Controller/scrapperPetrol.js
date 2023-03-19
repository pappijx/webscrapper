const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const petrol_price_list = require("../models/petrol");

exports.Scrapper = (mongoose) => {
  request(
    "https://www.ndtv.com/fuel-prices/petrol-price-in-all-state",
    (error, response, body) => {
      if (error) {
        console.error(error);
      } else {
        const $ = cheerio.load(body);
        let petrolDataFromWebsite = [];
        // creating data set
        $("table tr").each((index, element) => {
          if (index > 0) {
            petrolDataFromWebsite.push({
              state: $(element).find("td").eq(0).text(),
              price: $(element).find("td").eq(1).text().split(" ")[0],
              change: $(element).find("td").eq(2).text(),
            });
          }
        });

        if (petrolDataFromWebsite.length > 0) {
          mongoose.c;
          fs.writeFile(
            "data.json",
            JSON.stringify(petrolDataFromWebsite),
            (err) => {
              if (err) throw err;
              console.log("Data saved to file");
            }
          );
          // calling mongoose to insert items
          const bulkOps = petrolDataFromWebsite.map((price) => ({
            updateOne: {
              filter: { state: price.state },
              update: { $set: price },
              upsert: true,
            },
          }));

          petrol_price_list.bulkWrite(bulkOps, (err, result) => {
            if (err) {
              mongoose.disconnect();
              return console.error("error", err.message);
            }
            // const {
            //   BulkWriteResult: { result: actualResult },
            // } = result;
            console.table({
              deleted: result.deletedCount,
              inserted: result.insertedCount,
              modified: result.modifiedCount,
            });
            mongoose.disconnect();
          });

          // petrol_price_list.insertMany(petrolDataFromWebsite, (err, docs) => {
          //   if (err) {
          //     mongoose.disconnect();
          //     return console.error(err.message);
          //   }
          //   console.log(docs);
          //   mongoose.disconnect();
          // });
        } else {
          console.log("hello");
        }
      }
    }
  );
};
