const express = require("express")
const router = express.Router()
const galleryController = require("../controller/galleryController")
const {authenticate} = require("../middleware/authenticate");


router.post('/admin/manageGallery', authenticate, galleryController.manageGallery)
router.get('/admin/getGallery', galleryController.getGalleryPhoto )
router.delete("/admin/deleteGallery/:id", authenticate, galleryController.deleteGalleryPhoto)

module.exports = router