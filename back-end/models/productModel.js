import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,reuired:true},
    price: {type:Number,reuired:true},
    image: {type:String,required:true},
    category:{type:String,required:true}
})

const productModel = mongoose.models.food || mongoose.model("Product",productSchema);

export default productModel;