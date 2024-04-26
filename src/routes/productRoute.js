const express = require("express")
const router = express.Router()
const Product = require('../models/productModel.js')

const productController = require("../controller/productController.js")
const {authenticate} = require("../middleware/authenticate.js");

router.get("/" ,productController.getAllProducts)
router.get("/id/:id" ,productController.findProductById)
// Backend code (e.g., Express.js)
router.get('/search', async (req, res) => {
    const { query } = req.query;
  
    try {
      // Query the database for product suggestions based on the search query
      const suggestions = await Product.find({ name: { $regex: query, $options: 'i' } }).limit(10);
  
      res.json({ suggestions });
    } catch (error) {
      console.error('Error fetching product suggestions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router
