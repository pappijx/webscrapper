const mongoose = require("mongoose");

const petrol_price_list_scheme = new mongoose.Schema({
  state: { type: String, required: true, unique: true },
  price: String,
  change: String,
});

module.exports = mongoose.model("petrol_price_lists", petrol_price_list_scheme);
