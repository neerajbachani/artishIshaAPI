const express = require("express")
const router = express.Router()

const reviewController = require("../controller/reviewController")
const {authenticate} = require("../middleware/authenticate.js");

router.post("/create", authenticate, reviewController.createReview)
router.get("/product/:productId", authenticate, reviewController.getAllReview)

module.exports = router
