const express = require("express")
const router = express.Router()
const authController = require("../controller/authController")
const createAdminController = require("../controller/createAdminController")

router.post('/signup', authController.register)
router.post('/signin', authController.login)
router.post('/create-admin', createAdminController.createAdminUser)

module.exports = router
