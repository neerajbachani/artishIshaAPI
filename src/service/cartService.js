const Cart = require("../models/cartmodel");
const CartItem = require("../models/cartItemModel");
const Product = require("../models/productModel");
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

async function createCart(user) {
    try {
        const cart = new Cart({user});
        const createdCart = await cart.save();
        return createdCart;
       
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId) {
  
    try {
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        // Handle case when no cart is found for the given userId
        return null;
      }
      let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
      cart.cartItems = cartItems;
      let totalPrice = 0;
      let totalDiscountedPrice = 0;
      let totalItem = 0;
  
      for (let cartItem of cart.cartItems) {
        totalPrice += cartItem.price * cartItem.quantity;
        totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity;
        totalItem += cartItem.quantity;
      
      }
  
      cart.totalPrice = totalPrice;
      cart.totalItem = totalItem;
      cart.totalDiscountedPrice = totalDiscountedPrice;
      cart.discount = totalPrice - totalDiscountedPrice;
      return cart;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

async function addCartItem(userId, req, files) {

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
          // Handle case when no cart is found for the given userId
          cart = await createCart(userId);
          // throw new Error("Cart not found for the user");
        }
        const product = await Product.findById(req.productId);
        if (!product) {
          // Handle case when no product is found for the given productId
          throw new Error("Product not found");
        }

        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });

        if (!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                // size: req.size,
                discountedPrice: product.discountedPrice,
                discount: product.discount,
                customizationNote: req.customizationNote 
               
            });
            // const customizationImage = files[0];
            const customizationImage = files[0];
            if (customizationImage) {
              const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  {
                    upload_preset: 'artIshResin',
                    file: customizationImage.path || '',
                  },
                  (error, result) => {
                    if (error) {
                      reject(new Error('Failed to upload customization image'));
                    } else {
                      resolve(result);
                    }
                  }
                );
      
                const bufferStream = streamifier.createReadStream(customizationImage.buffer);
                bufferStream.pipe(stream);
              });
              
      
              // Set the customization customizationImage URL in the cartItem
              cartItem.customizationImage = uploadResult.secure_url;
         
            }
      
            const createdCartItem = await cartItem.save();
          

            cart.cartItems.push(createdCartItem);
        
            await cart.save();
            return createdCartItem;
            
            
        }
        return isPresent
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}


module.exports = {createCart , findUserCart, addCartItem};

