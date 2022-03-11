const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    baseDate: {
      type: String,
    },
    money: {
      type: Number,
    },
    content: {
      type: String,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    invoiceDetail: {
      type: Array,
    },
    uid: {
      type: String,
    },
    order: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const invoice = mongoose.model('invoice', invoiceSchema);
module.exports = invoice;
