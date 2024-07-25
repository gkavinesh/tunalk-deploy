import productModel from '../models/productModel.js';
import fs from 'fs';

// Add products
const addProduct = async (req, res) => {
    try {
        // Ensure req.files exists and is an array
        let image_filenames = req.files.map(file => file.filename);

        // Parse types from request body
        const types = JSON.parse(req.body.types);

        const product = new productModel({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            images: image_filenames,
            types: types
        });

        await product.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding product" });
    }
};

// List products
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching products" });
    }
};

// Remove product
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Remove all product images
        product.images.forEach(image => {
            fs.unlink(`uploads/${image}`, () => {});
        });

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing product" });
    }
};

// Update product price
const updateProductPrice = async (req, res) => {
    try {
        const { id, types } = req.body;

        // Validate the types array
        if (!Array.isArray(types) || types.some(type => typeof type.price !== 'number' || isNaN(type.price))) {
            return res.json({ success: false, message: "Invalid prices" });
        }

        // Update the prices for all types
        const result = await productModel.updateOne(
            { _id: id },
            { $set: { types: types } }
        );

        if (result.nModified === 0) {
            return res.json({ success: false, message: "Product not found or no changes made" });
        }

        res.json({ success: true, message: "Prices updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating prices" });
    }
}


export { addProduct, listProduct, removeProduct, updateProductPrice };







