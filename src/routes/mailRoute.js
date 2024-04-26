const express = require("express")
const router = express.Router()

const registerMail = require("../controller/mailer")

// const authenticate = require("../middleware/authenticate");

router.post('/registerMail', registerMail)


module.exports = router