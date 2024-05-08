const Product = require("../models/productModel");
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const { createReadStream } = require('fs');

async function createProduct(reqData, files) {
    const image = files[0]; // Assuming there's only one file in the files array  
    try {
      if (image) {
        const stream = cloudinary.uploader.upload_stream(
          {
            upload_preset: 'artIshResin',
            file: image.path || '',
          },
          (error, result) => {
        
            if (error) {
             
              return res.status(500).send({ error: 'Failed to upload image' });
            }
            const detailsAsBulletPoints = reqData.details.split('. ').map((detail) => `<li>${detail}</li>`).join('');
            const product = new Product({
              name: reqData.name,
              description1: reqData.description1,
              description2: reqData.description2,
              description3: reqData.description3,
              price: reqData.price,
              discountedPrice: reqData.discountedPrice,
              quantity: reqData.quantity,
              color: reqData.color,
              resin: reqData.resin,
              varmalaPreservation: reqData.varmalaPreservation,
              wallClock: reqData.wallClock,
              namePlate: reqData.namePlate,
              navkarMantraFrame: reqData.navkarMantraFrame,
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
              image: result.secure_url, // Add the Cloudinary image URL to the product object
            });
            return product.save();
          }
        );
        const bufferStream = streamifier.createReadStream(image.buffer);
        bufferStream.pipe(stream);
      }
    } catch (error) {
      res.status(500).send(error);
    }
}

async function updateProduct(productId, reqData, files) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
  
      // Update product fields based on reqData
      product.name = reqData.name || product.name;
      product.description1 = reqData.description1 || product.description1;
      product.description2 = reqData.description2 || product.description2;
      product.description3 = reqData.description3 || product.description3;
      product.price = reqData.price || product.price;
      product.discountedPrice = reqData.discountedPrice || product.discountedPrice;
      product.quantity = reqData.quantity || product.quantity;
      product.color = reqData.color || product.color;
      product.resin = reqData.resin || product.resin;
      product.varmalaPreservation = reqData.varmalaPreservation || product.varmalaPreservation;
      product.wallClock = reqData.wallClock || product.wallClock;
      product.namePlate = reqData.namePlate || product.namePlate;
      product.navkarMantraFrame = reqData.navkarMantraFrame || product.navkarMantraFrame;
      product.geodeArt = reqData.geodeArt || product.geodeArt;
      product.resinSpecial = reqData.resinSpecial || product.resinSpecial;
      product.resinRawMaterials = reqData.resinRawMaterials || product.resinRawMaterials;
      product.digitalArt = reqData.digitalArt || product.digitalArt;
      product.festivalSpecial = reqData.festivalSpecial || product.festivalSpecial;
      product.jewel = reqData.jewel || product.jewel;
      product.business = reqData.business || product.business;
      product.lippanArt = reqData.lippanArt || product.lippanArt;
      product.vintage = reqData.vintage || product.vintage;
      product.option = reqData.option || product.option;
      product.details = reqData.details || product.details;
      product.discount = reqData.discount || product.discount;
  
      let newImageUrl = product.image; // Initialize with the current image URL
  
      // Check if a new image was uploaded
      if (files && files.length > 0) {
        const image = files[0];
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              upload_preset: 'artIshResin',
              file: image.path || '',
            },
            (error, result) => {
              if (error) {
                reject(new Error('Failed to upload image'));
              } else {
                resolve(result);
              }
            }
          );
  
          const bufferStream = streamifier.createReadStream(image.buffer);
          bufferStream.pipe(stream);
        });
  
        // Update the newImageUrl with the new uploaded image URL
        newImageUrl = uploadResult.secure_url;
      }
  
      // Update the product's image field with the new image URL
      product.image = newImageUrl;
  
      const updatedProduct = await product.save();
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);

    return "Product deleted successfully";
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

  
