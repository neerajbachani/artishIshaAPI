const express = require("express")
const router = express.Router()
const contactController = require("../controller/contactController")
const {authenticate} = require("../middleware/authenticate");

router.post('/admin/manageContact', authenticate, contactController.manageContact)
router.get('/admin/getContact', authenticate, contactController.getContact )
router.delete("/admin/deleteContact/:id", authenticate, contactController.deleteContact)

module.exports = router