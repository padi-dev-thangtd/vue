const Products = require('../models/products');

const index = (req, res) => {
  try {
    Products.find({}, (err, products) => {
      if (err) next(err);
      return res.status(200).json({ products });
    });
  } catch (e) {
    next(e);
  }
};

const newProduct = async (req, res, next) => {
  try {
    console.log({ body: req.body });
    const newProduct = new Products(req.body);
    await newProduct.save((err, product) => {
      return res.status(201).json({ product });
    });
  } catch (e) {
    next(e);
  }
};

const getProductId = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Products.findById(productId);

    return res.status(200).json({ product });
  } catch (e) {
    next(e);
  }
};

const replaceProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const dataProductUpdate = req.body;
    await Products.findByIdAndUpdate(productId, dataProductUpdate);

    return res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await Products.findByIdAndDelete(productId, function (err, docs) {
      if (err) next(err);
      else return res.status(204).json({ success: true });
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  newProduct,
  getProductId,
  replaceProduct,
  removeProduct,
};
