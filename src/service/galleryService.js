const Gallery = require("../models/galleryModel");
const { find } = require("../models/userModel");
const streamifier = require('streamifier');
const cloudinary = require("../config/cloudinary")

const { createReadStream } = require('fs');

async function manageGallery(reqData, files) {
    if (!files || files.length === 0) {
      throw new Error('No image files provided');
    }
  
    try {
      const uploadPromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { upload_preset: 'artIshResin' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
  
          const bufferStream = streamifier.createReadStream(file.buffer);
          bufferStream.pipe(stream);
        });
      });
  
      const imageUrls = await Promise.all(uploadPromises);
  
      const galleryEntry = new Gallery({
        image: imageUrls, // Store all the image URLs
        // Add other fields if necessary
      });
  
      await galleryEntry.save();
  
      return galleryEntry;
    } catch (error) {
      throw new Error('Failed to upload images: ' + error.message);
    }
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