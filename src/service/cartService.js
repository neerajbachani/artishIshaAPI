const Cart = require("../models/cartmodel");
const CartItem = require("../models/cartItemModel");
const Product = require("../models/productModel");

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

async function addCartItem(userId, req) {
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
                discount: product.discount
            });


            // Add code logic here
            const createdCartItem = await cartItem.save()
            cart.cartItems.push(createdCartItem)
            await cart.save()
            return createdCartItem

        }
        return isPresent
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}





// async function addCartItem(userId, req) {
//     try {
//       const cart = await Cart.findOne({ user: userId });
//       if (!cart) {
//         // Handle the case when no cart is found for the user
//         throw new Error('Cart not found for the user');
//       }
  
//       const product = await Product.findById(req.productId);
//       if (!product) {
//         // Handle the case when the product is not found
//         throw new Error('Product not found');
//       }
  
//       const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });
  
//       if (!isPresent) {
//         const cartItem = new CartItem({
//           product: product._id,
//           cart: cart._id,
//           quantity: 1,
//           userId,
//           price: product.price,
//           // size: req.size,
//           discount: product.discount
//         });
  
//         const createdCartItem = await cartItem.save();
//         cart.cartItems.push(createdCartItem);
//         await cart.save();
//         return createdCartItem;
//       }
  
//       // If isPresent is not null, update the quantity and return the updated cartItem
//       isPresent.quantity += 1;
//       const updatedCartItem = await isPresent.save();
//       return updatedCartItem;
//     } catch (error) {
//       console.log(error);
//       throw new Error(error.message);
//     }
// }

module.exports = {createCart , findUserCart, addCartItem};

