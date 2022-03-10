const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucher');

router.route('/')
  .get(voucherController.index)
  .post(voucherController.newVoucher)

router.route('/decreaseVoucher/:voucherId')
  .get(voucherController.getVoucherId)
  .patch(voucherController.decreaseVoucher)
  .put(voucherController.replaceVoucher)
  .delete(voucherController.removeVoucher)

module.exports = router;
