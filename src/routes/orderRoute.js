const express = require("express")
const router = express.Router()

const orderController = require("../controller/orderController")
const {authenticate} = require("../middleware/authenticate.js");


router.post("/", authenticate, orderController.createOrder)
router.get("/user", authenticate, orderController.orderHistory)
router.get("/:id", authenticate, orderController.findOrderById)
router.get("/address/:id", authenticate, orderController.findAddressById)

module.exports = router

