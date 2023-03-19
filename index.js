const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Scrapper = require("./Controller/scrapper");
const uri =
  "mongodb+srv://pappijx:UmUmYGwqnBr6u3AH@webscrapper.697h1hj.mongodb.net/store_price?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Scrapper.Scrapper(mongoose);
