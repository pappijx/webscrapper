const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Scrapper = require("./Controller/scrapper");
const uri =
  "mongodb+srv://pappijx:kAQed0anL0yGhNyx@webscrapper.697h1hj.mongodb.net/store_price";
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB...");
    Scrapper.Scrapper();
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));
