const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers');

router.route('/')
  .get(userController.index)
  .post(userController.newUser)
  // .post(validateBody(schemas.userSchema), userController.newUser)

router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), userController.getUserId) // get user Id
  .put(userController.replaceUser) // Update user Id
  .delete(userController.removeUser) // Remove user id

router.route('/invoice/all')
  .get(userController.getInvoiceAll)

router.route('/:userId/invoice')
  .get(userController.getInvoice)
  .post(userController.newInvoice)

router.route('/:userId/invoice/:invoiceId')
  .get(userController.getInvoiceId)
  .put(userController.updateInvoice)

router.route('/:userId/cart')
  .get(userController.getCart)
  .post(userController.newCart)

router.route('/:userId/cart/deleteMany')
  .delete(userController.deleteAllCart)

router.route('/:userId/cart/:cartId')
  .delete(userController.removeCartId)
  .patch(userController.updateCart)

module.exports = router;
