const mongoose = require("mongoose");

const diesel_price_list_scheme = new mongoose.Schema({
  state: { type: String, required: true, unique: true },
  price: String,
  change: String,
});

module.exports = mongoose.model("diesel_price_lists", diesel_price_list_scheme);
