const orderService = require("../service/orderService")

const cron = require('node-cron');


// Schedule the deletePendingOrders to run once a day
cron.schedule('0 0 * * *', async () => {
    console.log("Running deletePendingOrders task...");
    await orderService.deletePendingOrders();
});

const createOrder = async (req, res) => {
    const user = await req.user;
    try {
        let createdOrder = await orderService.createOrder(user, req.body);
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const findOrderById = async (req, res) => {
    
    try {
        let createdOrder = await orderService.findOrderById(req.params.id);
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const findAddressById = async (req , res) => {
    try {
        let createdAddress = await orderService.getAddressById(req.params.id);
        return res.status(201).send(createdAddress);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const orderHistory = async (req, res) => {
    const user = await req.user;
    try {
        let createdOrder = await orderService.usersOrderHistory(user._id)
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { createOrder, findOrderById , orderHistory, findAddressById }
