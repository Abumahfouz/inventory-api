const orderSchema = require('../models/orderModel');
const createOrder = async (req, res) => {
    try {
        const newOrder = req.body;
        await orderSchema.create(newOrder);
        res.status(201).json({ success: true, data: newOrder });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}