const Address = require("../models/addressmodel");
const OrderItem = require("../models/orderItemsModel");
const Order = require("../models/orderModel");
const cartService = require("../service/cartService")

async function createOrder(user, shippAddress) {
    let address 

    if (shippAddress._id) {
        let existAddress = await Address.findById(shippAddress._id);
        address = existAddress;
    } else {
        address = new Address(shippAddress);
        // address.user = user;                           
        await address.save();
        user.address.push(address);
        await user.save();
    }
    const cart = await cartService.findUserCart(user._id);
const orderItems = [];

for (const item of cart.cartItems) {
    if (!item.product) {
        // Handle the case where product is missing or undefined
        console.error(`Product is missing for item: ${item}`);
        continue; // Skip this item and move to the next one
    }

    const orderItem = new OrderItem({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        userId: item.userId,
        discount: item.discount,
        discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
}
const createdOrder = new Order({
    user: user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discount: cart.discount,
    totalItem: cart.totalItem,
    shippingAddress: address,
    
});

const savedOrder = await createdOrder.save();
return savedOrder
}
// async function createOrder(user, shippAddress) {
//     let address;

//     if (shippAddress._id) {
//         let existAddress = await Address.findById(shippAddress._id);
//         address = existAddress;
//     } else {
//         address = new Address(shippAddress);
//         address.user = user;
//         await address.save();
//         user.address.push(address);
//         await user.save();
//     }

//     // Convert user and address to plain JavaScript objects
//     const userObject = user.toObject();
//     const addressObject = address.toObject();

//     const cart = await cartService.findUserCart(user._id);
//     const orderItems = [];

//     for (const item of cart.cartItems) {
//         const orderItem = new OrderItem({
//             price: item.price,
//             product: item.product,
//             quantity: item.quantity,
//             size: item.size,
//             userId: item.userId,
//             discount: item.discount,
//             note:item.note,
//         });

//         const createdOrderItem = await orderItem.save();
//         orderItems.push(createdOrderItem);
//     }

//     const createdOrder = new Order({
//         user: userObject,
//         orderItems,
//         totalPrice: cart.totalPrice,
//         totalDiscountedPrice: cart.totalDiscountedPrice,
//         discount: cart.discount,
//         totalItem: cart.totalItem,
//         shippingAddress: addressObject,
        
//     });
    

//     const savedOrder = await createdOrder.save();
//     return savedOrder;
// }

async function getAddressById(addressId){
    const address = await Address.findById(addressId).populate("user")
    return address
}


async function placeOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.paymentDetails.paymentStatus = "COMPLETED";

    return await order.save();
}

async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    return await order.save();
}

async function shipOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    return await order.save();
}

async function deliverOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "DELIVERED";

    return await order.save();
}

async function cancellOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELLED";

    return await order.save();
}

async function findOrderById(orderId) {

    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress");

    return order;
}

async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean();
        //   console.log(orders)
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllOrders() {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()
}

async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shipOrder,
    deliverOrder,
    cancellOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder, 
    getAddressById
}


