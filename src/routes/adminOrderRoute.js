const express = require("express")
const router = express.Router()

const orderController = require("../controller/adminOrderController.js");
const {authenticate, isAdmin} = require("../middleware/authenticate.js");


router.get("/", authenticate, orderController.getAllOrders);
router.put('/:orderId/confirmed', authenticate, orderController.confirmedOrder);
router.put('/:orderId/ship', authenticate, orderController.shipOrder);
router.put('/:orderId/deliver', authenticate, orderController.deliverOrder);
router.put('/:orderId/cancel', authenticate, orderController.cancellOrder);
router.delete('/:orderId/delete', authenticate, orderController.deleteOrder);

module.exports = router;
