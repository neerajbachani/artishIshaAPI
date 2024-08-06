const express = require("express")
const router = express.Router()
const Product = require('../models/productModel.js')

const productController = require("../controller/productController.js")
const {authenticate} = require("../middleware/authenticate.js");

router.get("/" ,productController.getAllProducts)
router.get("/id/:id" ,productController.findProductById)
router.get('/suggestions', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const regex = new RegExp(query, 'i');
    const suggestions = await Product.find({ name: regex })
      .select('name _id')
      .limit(5)
      .lean();

    res.json({ suggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Backend code (e.g., Express.js)
// router.get("/search",productController.searchProducts)

module.exports = router
