const OurBestSeller = require("../models/ourBestSellerModel");

async function createOurBestSellerProduct(reqData) {

    const ourBestSellerProduct = new OurBestSeller({

        image: reqData.image,
        title: reqData.title,
        price: reqData.price,
        discountedPrice: reqData.discountedPrice,
        link: reqData.link,
     
    })

    return await ourBestSellerProduct.save()
}

async function getOurBestSellerProduct() {
    return await OurBestSeller.find({});
}

async function findOurBestSellerProduct(id) {
    const ourBestSellerProduct = await OurBestSeller.findById(id).exec();
  
    if (!ourBestSellerProduct) {
      throw new Error("Our Best Seller Product not found with id " + id);
    }
  
    return ourBestSellerProduct;
}
async function DeleteOurBestSellerProduct(ourBestSellerProductId) {
    const ourBestSellerProduct = await findOurBestSellerProduct(ourBestSellerProductId)

    await OurBestSeller.findByIdAndDelete(ourBestSellerProductId);

    return "Our Best Seller Product deleted successfully";
}

module.exports = {createOurBestSellerProduct , getOurBestSellerProduct, findOurBestSellerProduct, DeleteOurBestSellerProduct}
