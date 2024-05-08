const express = require("express")
const router = express.Router()

const productController = require("../controller/productController")
const {authenticate} = require("../middleware/authenticate.js");



router.post("/", authenticate, productController.createProduct)
router.post("/creates", authenticate, productController.createMultipleProducts)
router.delete("/:id", authenticate, productController.deleteProduct)
router.put("/:id",authenticate, productController.updateProduct)

module.exports = router

