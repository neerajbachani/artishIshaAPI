const orderService = require("../service/orderService");

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).send(orders);
    } 
    catch (error) {
    return res.status(500).send({ error: error.message });
    }
}

const confirmedOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const orders = await orderService.confirmedOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const shipOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const orders = await orderService.shipOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deliverOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const orders = await orderService.deliverOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const cancellOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const orders = await orderService.cancellOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const orders = await orderService.deleteOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { getAllOrders, confirmedOrder, shipOrder, deliverOrder, cancellOrder, deleteOrder }