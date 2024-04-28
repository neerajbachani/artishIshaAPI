const Product = require("../models/productModel")

async function createProduct(reqData) {
   
    const detailsAsBulletPoints = reqData.details.split('. ').map(detail => `<li>${detail}</li>`).join('');

    const product = new Product({
        name: reqData.name,
        description1: reqData.description1,
        description2: reqData.description2,
        description3: reqData.description3,
        price: reqData.price,
        discountedPrice: reqData.discountedPrice,
        image: reqData.image,
        quantity: reqData.quantity,
        color: reqData.color,
        resin: reqData.resin,
        varmalaPreservation: reqData.varmalaPreservation,
        wallClock:reqData.wallClock,
        namePlate:reqData.namePlate,
        navkarMantraFrame:reqData.navkarMantraFrame,
        geodeArt: reqData.geodeArt,
        resinSpecial: reqData.resinSpecial,
        resinRawMaterials: reqData.resinRawMaterials,
        digitalArt: reqData.digitalArt,
        festivalSpecial: reqData.festivalSpecial,
        jewel: reqData.jewel,
        business: reqData.business,
        lippanArt: reqData.lippanArt,
        vintage: reqData.vintage,
        
        option: reqData.option,   
        details: `<ul>${detailsAsBulletPoints}</ul>`, 
        discount: reqData.discount,
        

    });

    return await product.save()
    


}

async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);

    return "Product deleted successfully";
}

async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id) {
    const product = await Product.findById(id).exec();
  
    if (!product) {
      throw new Error("Product not found with id " + id);
    }
  
    return product;
}

async function getAllProducts(reqQuery) {
    let { sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

  pageSize = pageSize || 10;
  let query = Product.find();

  const filterFields = [
    'color', 'resin', 'varmalaPreservation', 'wallClock', 'namePlate', 'navkarMantraFrame', 'resinSpecial', 'digitalArt', 'jewel', 'festivalSpecial', 'business', 'lippanArt', 'vintage', 'geodeArt', 'resinRawMaterials'
  ];

  filterFields.forEach(field => {
    if (reqQuery[field]) {
      const valueSet = new Set(reqQuery[field].split(",").map(value => value.trim().toLowerCase()));
      const valueRegex = valueSet.size > 0 ? new RegExp([...valueSet].join("|"), "i") : null;

      if (valueRegex) {
        query = query.or([{ [field]: valueRegex }]);
      }
    }
  });
    
    if (sizes) {
        const sizesSet = new Set(sizes);
        query.query.where("sizes.name").in([...sizesSet]);
    }
    
    if (minPrice && maxPrice) {
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
        query = query.where("discount").gte(minDiscount);
    }

    if (stock) {
        if (stock == "in_stock") {
            query = query.where("quantity").gt(0);
        } 
        else if (stock == "out_of_stock") {
            query = query.where("quantity").gt(1);
        }
    }
    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }
    
    const totalProducts = await Product.countDocuments(query);
    
    const skip = (pageNumber - 1) * pageSize;

    query = query.skip(skip).limit(pageSize)

    const products = await query.exec()

    const totalPages = Math.ceil(totalProducts/pageSize)

    return {content: products, currentPage: pageNumber, totalPages}
    
    
}

async function createMultipleProducts(products){
    for(let product of products){
        await createProduct(product)
    }
}

module.exports = { createProduct, deleteProduct, updateProduct, findProductById, getAllProducts, createMultipleProducts }

  
