const Gallery = require("../service/galleryService")

const manageGallery = async (req, res) => {
    try {
        const gallery = await Gallery.manageGallery(req.body, req.files)
        return res.status(201).send(gallery);
    } catch (error) {
        return res.status(500).send({ error: error.message });
        // console.log("error",error.message)

    }
}

const getGalleryPhoto = async (req, res) => {
   
    try {
        const getGalleryPhotos = await Gallery.getGallery()
        return res.status(201).send(getGalleryPhotos);
    } catch (error) {
        return res.status(500).send({ error: "error aaya hai ji" });
    }
}

const deleteGalleryPhoto = async (req, res) => {
    const galleryId = req.params.id;
    try {
        const gallery = await Gallery.DeleteGallery(galleryId)
        return res.status(201).send(gallery);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {manageGallery , getGalleryPhoto, deleteGalleryPhoto}