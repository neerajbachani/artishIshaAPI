const express = require("express")
const router = express.Router()
const ourProductController = require("../controller/ourProductController")
const {authenticate} = require("../middleware/authenticate");

router.post('/admin/createourProduct', authenticate, ourProductController.createourProduct)
router.get('/getourProduct', ourProductController.getourProduct)
router.delete("/deleteourProduct/:id", authenticate, ourProductController.deleteourProduct)

module.exports = router 