const Products = require('../models/productModel');

// Controller to get all products
const getAllProducts = async (req, res) => {
    try {
        // Logic to get all products from the database
        const products = await Products.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(error);
    }
}

// Get a product by id
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        // Logic to get a product by id from the database
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(error);
    }
}

// Controller to create a new product
const createProduct = async (req, res) => {
    try {
        // Logic to create a new product in the database
        const { name, price, category, quantity } = req.body;
        if (!name || !price || !category || !quantity) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const newProduct = new Products({
            name,
            price,
            category,
            quantity
        });
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(error);
    }
}

//Update a product by id
const updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const updates = req.body;
        // Logic to update a product by id in the database
        const updatedProduct = await Products.findByIdAndUpdate(productId, updates,
            { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(error);
    }
}

// Delete a product by id
const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        // Logic to delete a product by id from the database
        const deletedProduct = await Products.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(204).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(error);
    }
}

// Exporting the controller functions
module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById
};