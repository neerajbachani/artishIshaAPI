const ourProduct = require("../service/ourProductService")

const createourProduct = async (req, res) => {
    try {
        const createourProduct = await ourProduct.createourProduct(req.body)
        return res.status(201).send(createourProduct);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getourProduct = async (req, res) => {
    // const productId = req.params.id;
    try {
        const getourProduct = await ourProduct.getourProduct()
        return res.status(201).send(getourProduct);
    } catch (error) {
        return res.status(500).send({ error: "error aaya hai ji" });
    }
}

const deleteourProduct = async (req, res) => {
    const ourProductId = req.params.id;
    try {
        const deleteourProduct = await ourProduct.DeleteourProduct(ourProductId)
        return res.status(201).send(deleteourProduct);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {createourProduct , getourProduct, deleteourProduct}