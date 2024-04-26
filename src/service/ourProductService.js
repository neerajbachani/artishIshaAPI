const ourProduct = require("../models/ourProductsModel");

async function createourProduct(reqData) {

    const createourProduct = new ourProduct({

        image: reqData.image,
        title: reqData.title,
        price: reqData.price,
        discountedPrice: reqData.discountedPrice,
        link: reqData.link,
        type: reqData.type,
     
    })

    return await createourProduct.save()
}

async function getourProduct() {
    return await ourProduct.find({});
}

async function findourProduct(id) {
    const findourProduct = await ourProduct.findById(id).exec();
  
    if (!findourProduct) {
      throw new Error("Our Best Seller Product not found with id " + id);
    }
  
    return findourProduct;
}
async function DeleteourProduct(ourProductId) {
    const deleteourProduct = await findourProduct(ourProductId)

    await ourProduct.findByIdAndDelete(ourProductId);

    return "Our Best Seller Product deleted successfully";
}

module.exports = {createourProduct , getourProduct, findourProduct, DeleteourProduct}