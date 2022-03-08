const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  permission: {
    type: String
  },
  name: {
    type: String
  },
  phone: {
    type: Number
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
  voucher: {
    type: Array
  },
  usedVoucher: {
    type: Array
  },
  invoice: [{
    type: Schema.Types.ObjectId,
    ref: 'invoice',
  }],
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'cart',
    sparse: true,
    partialFilterExpression: { cart: { '$type': 'array' } },
    background: true
  }],
});

const user = mongoose.model('User', UserSchema);
module.exports = user;
