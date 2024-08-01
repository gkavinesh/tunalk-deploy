import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    address: { type: String, required: true },
    type: { type: String, required: true },
    postcode: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "failed"],
    default: "pending",
  },
});

// Use existing model if it exists, otherwise create a new one
const paymentModel = mongoose.models.payment || mongoose.model("Payment", paymentSchema);

export default paymentModel;




