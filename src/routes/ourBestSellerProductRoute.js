const express = require("express")
const router = express.Router()
const ourBestSellerProductController = require("../controller/ourBestSellerProductController")
const {authenticate} = require("../middleware/authenticate");

router.post('/admin/createOurBestSellerProduct', authenticate, ourBestSellerProductController.createOurBestSellerProduct)
router.get('/getOurBestSellerProduct', ourBestSellerProductController.getOurBestSellerProduct)
router.delete("/deleteOurBestSellerProduct/:id", authenticate, ourBestSellerProductController.deleteOurBestSellerProduct)

module.exports = router 