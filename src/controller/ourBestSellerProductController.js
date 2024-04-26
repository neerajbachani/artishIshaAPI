const ourBestSeller = require("../service/ourBestSeller")

const createOurBestSellerProduct = async (req, res) => {
    try {
        const ourBestSellerProduct = await ourBestSeller.createOurBestSellerProduct(req.body)
        return res.status(201).send(ourBestSellerProduct);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getOurBestSellerProduct = async (req, res) => {
    // const productId = req.params.id;
    try {
        const getOurBestSellerProduct = await ourBestSeller.getOurBestSellerProduct()
        return res.status(201).send(getOurBestSellerProduct);
    } catch (error) {
        return res.status(500).send({ error: "error aaya hai ji" });
    }
}

const deleteOurBestSellerProduct = async (req, res) => {
    const ourBestSellerProductId = req.params.id;
    try {
        const ourBestSellerProduct = await ourBestSeller.DeleteOurBestSellerProduct(ourBestSellerProductId)
        return res.status(201).send(ourBestSellerProduct);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {createOurBestSellerProduct , getOurBestSellerProduct, deleteOurBestSellerProduct}