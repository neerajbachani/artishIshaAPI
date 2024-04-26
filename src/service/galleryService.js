const Gallery = require("../models/galleryModel");
const { find } = require("../models/userModel");

async function manageGallery(reqData) {

    const gallery = new Gallery({    
        link: reqData.link,
    })

    return await gallery.save()
}

async function getGallery() {
    return await Gallery.find({});
}

async function findGalleryById(id) {
    const gallery = await Gallery.findById(id).exec();
  
    if (!gallery) {
      throw new Error("Gallery Photo not found with id " + id);
    }
  
    return gallery;
}
async function DeleteGallery(galleryId) {
    const gallery = await findGalleryById(galleryId)

    await Gallery.findByIdAndDelete(galleryId);

    return "Gallery Photo deleted successfully";
}

module.exports = {manageGallery, getGallery, findGalleryById, DeleteGallery}