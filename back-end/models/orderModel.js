import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {type:String, required: true},
    userId: { type: String, required: true},
    address: {
        address: { type: String, required: true },
        type: { type: String, required: true },
        postcode: { type: String, required: true }
    },
    items: [{
        itemId: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        weight: { type: String, required: true }, // Adjust if weight has a different format
        amount: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: {type: String, required:true},
    status: { type: String, default: "Order Processing" },
    date: { type: Date, default: Date.now },
    payment: { type: String, default: "Pending" }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;


