const express = require("express");
const app = express();
const mongoose = require("mongoose");
const petrolScrapper = require("./Controller/scrapperPetrol");
const dieselScrapper = require("./Controller/scrapperDiesel");
const uri =
  "mongodb+srv://pappijx:UmUmYGwqnBr6u3AH@webscrapper.697h1hj.mongodb.net/store_price?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

petrolScrapper.Scrapper(mongoose);
dieselScrapper.Scrapper(mongoose);
