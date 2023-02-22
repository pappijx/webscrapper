const mongoose = require("mongoose");

const petrol_price_list_scheme = new mongoose.Schema({
  state: String,
  price: String,
  change: String,
});

module.exports = mongoose.model("petrol_price_list", petrol_price_list_scheme);
