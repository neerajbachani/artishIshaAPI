const express = require("express")
const router = express.Router()
const heroSectionController = require("../controller/heroSectionController")
const {authenticate} = require("../middleware/authenticate");

router.post('/admin/manageHeroSection', authenticate, heroSectionController.manageHeroSection)
router.get('/', heroSectionController.getHeroSection )
router.delete("/:id", authenticate, heroSectionController.deleteHeroSection)

module.exports = router