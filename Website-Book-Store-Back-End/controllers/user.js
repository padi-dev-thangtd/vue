const mongoose = require('mongoose');

const User = require('../models/user');
const Invoice = require('../models/invoice');
const Cart = require('../models/cart');
// short-unique-id
const ShortUniqueId = require('short-unique-id');

const index = (req, res) => {
  try {
    User.find({}, (err, users) => {
      if (err) next(err);
      return res.status(200).json({ users });
    });
  } catch (e) {
    next(e);
  }
};

const newUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save((err, user) => {
      if (err) next(err);
      return res.status(201).json({ user });
    });
  } catch (e) {
    next(e);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const { userId } = req.value.params;
    const user = await User.findById(userId);

    return res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

const replaceUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const dataUserUpdate = req.body;
    await User.findByIdAndUpdate(userId, dataUserUpdate);

    return res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId, function (err, docs) {
      if (err) next(err);
      else return res.status(204).json({ success: true });
    });
  } catch (e) {
    next(e);
  }
};

// Invoice
const getInvoice = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate('invoice');
  return res.status(200).json({ invoice: user.invoice });
};

const getInvoiceId = async (req, res, next) => {
  try {
    let { userId, invoiceId } = req.params;
    const user = await User.findById(userId);
    const invoice = await Invoice.findById(invoiceId).populate('owner');

    return res.status(200).json({ invoiceId: invoice });
  } catch (e) {
    next(e);
  }
};

const getInvoiceAll = async (req, res, next) => {
  const userAll = await User.find().populate('invoice');
  let data = [];
  userAll.forEach((it) => {
    const rest = {
      email: it?.email,
      name: it?.name,
      userName: it?.userName,
      address: it?.address,
      phone: it?.phone,
    };
    data.push(it.invoice);
  });
  let invoiceAll = data.reduce((arr, it) => {
    return arr.concat(it);
  }, []);
  return res.status(200).json({ invoiceAll: invoiceAll, userAll, data });
};

const newInvoice = async (req, res, next) => {
  const { userId } = req.params;
  if (mongoose.Types.ObjectId.isValid(userId)) {
    const uid = new ShortUniqueId({ length: 10 });
    const newInvoice = new Invoice(req.body);
    const user = await User.findById(userId);
    newInvoice.owner = user;
    newInvoice.uid = uid();
    await newInvoice.save();
    user.invoice.push(newInvoice._id);
    await user.save();
    res.status(201).json({ invoice: newInvoice, uid: uid() });
  } else {
    console.log('data fail');
  }
};

const updateInvoice = async (req, res, next) => {
  try {
    const { invoiceId } = req.params;
    const dataInvoiceUpdate = req.body;
    await Invoice.findByIdAndUpdate(invoiceId, dataInvoiceUpdate);

    return res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};

// Cart
const getCart = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate('cart');
  return res.status(200).json({ cart: user.cart, user });
};

const newCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newCart = new Cart(req.body);
    const user = await User.findById(userId);
    newCart.owner = user;
    await newCart.save();
    user.cart.push(newCart._id);
    await user.save();

    return res.status(201).json({ cart: newCart });
  } catch (e) {
    next(e);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const newCart = req.body;
    const result = await Cart.findByIdAndUpdate(cartId, newCart);

    return res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
};

const removeCartId = async (req, res, next) => {
  try {
    const { userId, cartId } = req.params;
    const cart = await Cart.findById(cartId);
    cart ? await cart.remove() : '';
    const user = await User.findById(userId);
    await user.cart.pull(cartId);
    await user.save();
    return res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
};

const deleteAllCart = async (req, res, next) => {
  try {
    const { userId } = req.params;

    //  owner: userId delete many
    // const invoice = await Invoice.deleteMany({ owner: userId });
    // update invoice in user schema
    // remove owner cart

    const cart = await Cart.deleteMany({ owner: userId });
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();
    return res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  newUser,
  getUserId,
  replaceUser,
  removeUser,
  getInvoice,
  getInvoiceId,
  getInvoiceAll,
  newInvoice,
  updateInvoice,
  getCart,
  newCart,
  updateCart,
  removeCartId,
  deleteAllCart,
};
