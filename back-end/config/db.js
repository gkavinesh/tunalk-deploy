import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://flickerintwitter:oWKMX5pRTlGGBMys@cluster0.zyqpyyz.mongodb.net/Tuna').then(()=>console.log("DB Connected"));
}

