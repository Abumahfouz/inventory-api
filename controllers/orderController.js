const Order = require('../models/orderModel');
const createOrder = async (req, res) => {
    try {
        const {product, quantity} = req.body;
        if (!product || !quantity) {
            return res.status(400).json({ success: false, message: 'Product and quantity are required' });
        }
        const order = await Order.create({ product, quantity, user: req.user.userId });
        res.status(201).json({ success: true, data: order });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}
module.exports = {
    createOrder
};