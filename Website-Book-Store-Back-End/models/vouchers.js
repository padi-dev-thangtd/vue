const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
	nameVoucher: {
    type: String,
  },
  logo: {
    type: String
  },
	baseDate: {
    type: String
  },
  use: {
    type: Boolean
  },
  apply: {
    type: String
  },
  coin: {
    type: Number
  }
});

const voucher = mongoose.model('voucher', voucherSchema);
module.exports = voucher;