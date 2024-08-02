import express from 'express';
import multer from 'multer';
import { confirmPayment,listPayment } from '../controllers/paymentController.js';

const paymentRouter = express.Router();

// Image Storage engine
const storage = multer.diskStorage({
  destination: "receipts",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage : storage });

// Route for confirming payment and uploading receipt
paymentRouter.post('/confirm', upload.single('image'), confirmPayment);
paymentRouter.post('/list',listPayment)

export default paymentRouter;





