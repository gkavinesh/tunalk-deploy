import express from 'express';
import multer from 'multer';
import { confirmPayment,listPayment } from '../controllers/paymentController.js';

const paymentRouter = express.Router();

// Set up multer for file uploads
const Storage = multer.diskStorage({
  destination: "receipts",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage : Storage });

// Route for confirming payment and uploading receipt
paymentRouter.post('/confirm', upload.single('receipt'), confirmPayment);
paymentRouter.post('/list',listPayment)

export default paymentRouter;





