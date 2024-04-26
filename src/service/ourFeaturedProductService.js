const ourFeaturedProduct = require("../models/ourFeaturedProductModel");

async function createourFeaturedProduct(reqData) {

    const createOurFeaturedProduct = new ourFeaturedProduct({

        image: reqData.image,
        title: reqData.title,
        price: reqData.price,
        discountedPrice: reqData.discountedPrice,
        link: reqData.link,
     
    })

    return await createOurFeaturedProduct.save()
}

async function getourFeaturedProduct() {
    return await ourFeaturedProduct.find({});
}

async function findourFeaturedProduct(id) {
    const findOurFeaturedProduct = await ourFeaturedProduct.findById(id).exec();
  
    if (!findOurFeaturedProduct) {
      throw new Error("Our Best Seller Product not found with id " + id);
    }
  
    return findOurFeaturedProduct;
}
async function DeleteourFeaturedProduct(ourFeaturedProductId) {
    const deleteOurFeaturedProduct = await findourFeaturedProduct(ourFeaturedProductId)

    await ourFeaturedProduct.findByIdAndDelete(ourFeaturedProductId);

    return "Our Best Seller Product deleted successfully";
}

module.exports = {createourFeaturedProduct , getourFeaturedProduct, findourFeaturedProduct, DeleteourFeaturedProduct}