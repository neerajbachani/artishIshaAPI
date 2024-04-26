const express = require("express")
const router = express.Router()
const ourFeaturedProductController = require("../controller/ourFeaturedProductController")
const {authenticate} = require("../middleware/authenticate");

router.post('/admin/createOurFeaturedProduct', authenticate, ourFeaturedProductController.createourFeaturedProduct)
router.get('/getOurFeaturedProduct', ourFeaturedProductController.getourFeaturedProduct)
router.delete("/deleteOurFeaturedProduct/:id", authenticate, ourFeaturedProductController.deleteourFeaturedProduct)

module.exports = router 