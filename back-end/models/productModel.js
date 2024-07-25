import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    types: [typeSchema]  // Add the types subdocument array
});

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;


