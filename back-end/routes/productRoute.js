import express from 'express';
import { addProduct, listProduct, removeProduct, updateProductPrice } from '../controllers/productController.js';
import multer from 'multer';

const productRouter = express.Router();

// Image Storage Engine
const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: Storage });

// Use `array` instead of `single` to handle multiple files
productRouter.post("/add", upload.array("images"), addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", removeProduct);
productRouter.put("/update-price", updateProductPrice); // New route for updating price

export default productRouter;





