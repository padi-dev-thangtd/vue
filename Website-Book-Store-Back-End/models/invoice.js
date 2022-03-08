const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  baseDate: {
    type: String,
  },
  money: {
    type: Number,
  },
  content: {
    type: String,
  },
  owner: { type: Schema.Types.ObjectId, ref: 'user' },
  invoiceDetail: {
    type: Array,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const invoice = mongoose.model("invoice", invoiceSchema);
module.exports = invoice;
