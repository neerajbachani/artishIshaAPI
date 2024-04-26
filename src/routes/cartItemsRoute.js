const express = require("express")
const router = express.Router()

const cartItemsController = require("../controller/cartItemController")
const {authenticate} = require("../middleware/authenticate.js");


router.put("/:id", authenticate, cartItemsController.updateCartItem);
router.delete("/:id", authenticate, cartItemsController.removeCartItem);

module.exports = router
