const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productId: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  quanlity: {
    type: Number,
  },
  remain: {
    type: Number,
  },
  sale: {
    type: String,
  },
  index: { type: Number, index: true },
});

const cart = mongoose.model("cart", cartSchema);
module.exports = cart;
