const express = require("express")
const router = express.Router()

const ratingController = require("../controller/ratingController.js")
const {authenticate} = require("../middleware/authenticate.js");

router.post("/create", ratingController.createrating)
router.get("/product/:productId", ratingController.getAllRating)

module.exports = router