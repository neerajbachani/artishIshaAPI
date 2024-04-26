const ourFeaturedProduct = require("../service/ourFeaturedProductService")

const createourFeaturedProduct = async (req, res) => {
    try {
        const createOurFeaturedProduct = await ourFeaturedProduct.createourFeaturedProduct(req.body)
        return res.status(201).send(createOurFeaturedProduct);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getourFeaturedProduct = async (req, res) => {
    // const productId = req.params.id;
    try {
        const getourFeaturedProduct = await ourFeaturedProduct.getourFeaturedProduct()
        return res.status(201).send(getourFeaturedProduct);
    } catch (error) {
        return res.status(500).send({ error: "error aaya hai ji" });
    }
}

const deleteourFeaturedProduct = async (req, res) => {
    const ourFeaturedProductId = req.params.id;
    try {
        const deleteOurFeaturedProduct = await ourFeaturedProduct.DeleteourFeaturedProduct(ourFeaturedProductId)
        return res.status(201).send(deleteOurFeaturedProduct);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {createourFeaturedProduct , getourFeaturedProduct, deleteourFeaturedProduct}