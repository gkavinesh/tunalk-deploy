import productModel from '../models/productModel.js';
import fs from 'fs';


//add products
const addProduct = async (req,res) => {
    let image_filename = `${req.file.filename}`

    const product = new productModel({

        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await product.save();
        res.json({success:true,message:"Product Added"})
    }catch (error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//all product list
const listProduct = async (req,res) => {
    try{
        const products = await productModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"ERROR"})

    }

}

export {addProduct,listProduct}

