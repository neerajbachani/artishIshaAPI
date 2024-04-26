const express = require("express")
const router = express.Router()

const ratingController = require("../controller/ratingController.js")
const {authenticate} = require("../middleware/authenticate.js");

router.post("/create", authenticate, ratingController.createrating)
router.get("/product/:productId", authenticate, ratingController.getAllRating)

module.exports = router