const Voucher = require("../models/vouchers");

const index = (req, res) => {
  try {
    Voucher.find({}, (err, vouchers) => {
      if (err) next(err);
      return res.status(200).json({ vouchers });
    });
  } catch (e) {
    next(e);
  }
};

const newVoucher = async (req, res, next) => {
  try {
    const newVoucher = new Voucher(req.body);
    await newVoucher.save((err, voucher) => {
      return res.status(201).json({ voucher });
    });
  } catch (e) {
    next(e);
  }
};

const getVoucherId = async (req, res, next) => {
  try {
    const { voucherId } = req.params;
    const voucher = await Voucher.findById(voucherId);

    return res.status(200).json({ voucher });
  } catch (e) {
    next(e);
  }
};

const replaceVoucher = async (req, res, next) => {
  try {
    const { voucherId } = req.params;
    const dataVoucherUpdate = req.body;
    await Voucher.findByIdAndUpdate(voucherId, dataVoucherUpdate);

    return res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};

const decreaseVoucher = async (req, res, next) => {
  try {
    const { voucherId } = req.params;
    console.log({ voucherId });
    await Voucher.findOneAndUpdate(
      { _id: voucherId },
      { $inc: { quantity: -1 } }
    );

    return res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};

const removeVoucher = async (req, res, next) => {
  try {
    const { voucherId } = req.params;
    await Voucher.findByIdAndDelete(voucherId, function (err, docs) {
      if (err) next(err);
      else return res.status(204).json({ success: true });
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  newVoucher,
  getVoucherId,
  replaceVoucher,
  removeVoucher,
  decreaseVoucher,
};
