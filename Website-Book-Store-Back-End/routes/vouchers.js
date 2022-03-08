const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucher');

router.route('/')
  .get(voucherController.index)
  .post(voucherController.newVoucher)

router.route('/:voucherId')
  .get(voucherController.getVoucherId)
  .put(voucherController.replaceVoucher)
  .delete(voucherController.removeVoucher)

module.exports = router;
