const express = require("express")
const router = express.Router()
const Product = require('../models/productModel.js')

const productController = require("../controller/productController.js")
const {authenticate} = require("../middleware/authenticate.js");

router.get("/" ,productController.getAllProducts)
router.get("/id/:id" ,productController.findProductById)
// Backend code (e.g., Express.js)
// router.get("/search",productController.searchProducts)

module.exports = router
