const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
    },
    auth: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    type: {
      type: String,
    },
    quanlity: {
      type: Number,
    },
    pageNumber: {
      type: Number,
    },
    rate: {
      type: Number,
    },
    content: {
      type: String,
    },
    sale: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model('Products', UserSchema);
module.exports = products;
