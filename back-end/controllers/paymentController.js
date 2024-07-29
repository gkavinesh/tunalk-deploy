import paymentModel from '../models/paymentModel.js';
import orderModel from '../models/orderModel.js';

// Handle payment confirmation
const confirmPayment = async (req, res) => {
    try {
        // Check if file(s) exist in the request
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        // Extract filename(s) from uploaded file(s)
        const receiptUrl = req.file.filename ? `/receipts/${req.file.filename}` : '';

        // Parse address from request body
        const { firstName, lastName, email, phone, address } = req.body;

        // Create a new payment document
        const payment = new paymentModel({
            receiptUrl,
            firstName,
            lastName,
            email,
            phone,
            address: JSON.parse(address) // Ensure this is a valid JSON string
        });

        await payment.save();
        res.json({ success: true, message: "Payment confirmed", payment });
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({ success: false, message: "Error confirming payment" });
    }
};


// Handle listing of payments
const listPayment = async (req, res) => {
    try {
      const payments = await paymentModel.find();
      res.json({ success: true, payments });
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ success: false, message: "Error fetching payments" });
    }
  };
  

export { confirmPayment, listPayment };








